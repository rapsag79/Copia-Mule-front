import React from 'react';
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllUsers} from '../../../redux/actions';
import useUser from '../../../hooks/useUser';
import CustomerRow from './CustomerRow';

const CustomerTable = (
   {
    setShowModalEdit,
    setShowModalDetail,
    setShowModalDelete,
    setActualDetail,
    setCurrentUserId
   }
) => {
  const { allUsers } = useUser();
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define cuántos elementos quieres mostrar por página

  const totalPages = Math.ceil(allUsers.length / itemsPerPage);

  const handleNextPage = () => {
      if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
      }
  }

  const handlePreviousPage = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
  }

  const chargingData = async () => {
      if (!dataLoaded) {
          await dispatch(getAllUsers());
          setDataLoaded(true);
      }
  }

  useEffect(() => {
      chargingData();
  }, [dispatch, allUsers]);
    

    return (
      <div>
        <div className="px-5 py-5 bg-white justify-start">
                <div className="inline-flex mt-2 xs:mt-0">
                    <button onClick={handlePreviousPage} className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                        Anterior
                    </button>
                    <button onClick={handleNextPage} className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                        Siguiente
                    </button>
                </div>
            </div>
      <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verificación de Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefono</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taza de Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
            </thead>
          {
              allUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((user) => {
                  return (
                      <CustomerRow
                          user={user}
                          setShowModalEdit={setShowModalEdit}
                          setShowModalDetail={setShowModalDetail}
                          setShowModalDelete={setShowModalDelete}
                          setCurrentUserId={setCurrentUserId}
                          setActualDetail={setActualDetail}
                      />
                  )
              })
          }
      </table>
      
  </div>
    );
};


export default CustomerTable;
