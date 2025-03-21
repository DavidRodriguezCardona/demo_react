import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { permissionService } from "../../services/permissionService";
import Swal from "sweetalert2";
import { Permission } from "../../models/Permission";

const ListPermissions = () => {
    const [data, setData] = useState<Permission[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const permissions = await permissionService.getPermissions();
        setData(permissions);
    };

    const handleView = (id: number) => {
        console.log(`Ver permiso con ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        console.log(`Editar permiso con ID: ${id}`);
        Swal.fire({
            title: "Edición",
            text: ""
        });
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminar Permiso",
            text: "¿Está seguro de querer eliminar este permiso?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await permissionService.deletePermission(id);
                if (success) {
                    Swal.fire("Eliminado", "El permiso ha sido eliminado", "success");
                }
                fetchData();
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Listado de Permisos</h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Nombre</th>
                                        <th className="px-6 py-3">Métodos</th>
                                        <th className="px-6 py-3">URL</th>
                                        <th className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-200">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                            <td className="px-6 py-4">{item.methods}</td>
                                            <td className="px-6 py-4">{item.url}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(item.id!)} className="text-blue-600 dark:text-blue-500">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(item.id!)} className="text-yellow-600 dark:text-yellow-500">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(item.id!)} className="text-red-600 dark:text-red-500">
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListPermissions;

