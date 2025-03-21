import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { roleService } from "../../services/roleService";
import Swal from "sweetalert2";
import { Role } from "../../models/Role";

const ListRoles = () => {
    const [data, setData] = useState<Role[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const roles = await roleService.getRoles();
        setData(roles);
    };

    const handleView = (id: number) => {
        console.log(`Ver rol con ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        console.log(`Editar rol con ID: ${id}`);
        Swal.fire({
            title: "Edición",
            text: "Editar rol"
        });
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar el rol?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await roleService.deleteRole(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "El rol se ha eliminado",
                        icon: "success"
                    });
                }
                fetchData();
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default">
                    <div className="border-b border-stroke px-6.5 py-4">
                        <h3 className="font-medium text-black">Listado de Roles</h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nombre</th>
                                        <th scope="col" className="px-6 py-3">Descripción</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                            <td className="px-6 py-4">{item.description}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(item.id ?? 0)} className="text-blue-600">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => item.id !== undefined && handleEdit(item.id)} className="text-yellow-600">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => item.id !== undefined && handleDelete(item.id)} className="text-red-600">
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

export default ListRoles;
