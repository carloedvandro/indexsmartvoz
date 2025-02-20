
import { CustomersList } from "@/components/admin/customers/CustomersList";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminCustomers() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <CustomersList />
        </div>
      </main>
    </div>
  );
}
