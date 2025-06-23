
import React from "react";

export function UserTableHeader() {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b font-medium text-sm text-gray-700">
      <div className="col-span-3">Usuário</div>
      <div className="col-span-2">Papel</div>
      <div className="col-span-2">Status</div>
      <div className="col-span-2">CPF</div>
      <div className="col-span-1 text-center">País</div>
      <div className="col-span-2 text-right">Ações</div>
    </div>
  );
}
