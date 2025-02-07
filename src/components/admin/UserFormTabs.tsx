
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalDataTab } from "./tabs/PersonalDataTab";
import { ContactTab } from "./tabs/ContactTab";
import { AddressTab } from "./tabs/AddressTab";
import { OtherTab } from "./tabs/OtherTab";
import { AccessLogsTab } from "./tabs/AccessLogsTab";

export function UserFormTabs({ register, setValue, watch, readOnly = false }) {
  const userId = watch("id");

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
        <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
        <TabsTrigger value="contact">Contato</TabsTrigger>
        <TabsTrigger value="address">Endereço</TabsTrigger>
        <TabsTrigger value="other">Outros</TabsTrigger>
        <TabsTrigger value="logs">Logs de Acesso</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="space-y-4">
        <PersonalDataTab 
          register={register} 
          setValue={setValue} 
          watch={watch}
          readOnly={readOnly}
        />
      </TabsContent>

      <TabsContent value="contact" className="space-y-4">
        <ContactTab register={register} />
      </TabsContent>

      <TabsContent value="address" className="space-y-4">
        <AddressTab register={register} />
      </TabsContent>

      <TabsContent value="other" className="space-y-4">
        <OtherTab 
          register={register}
          setValue={setValue}
          watch={watch}
        />
      </TabsContent>

      <TabsContent value="logs" className="space-y-4">
        <AccessLogsTab userId={userId} />
      </TabsContent>
    </Tabs>
  );
}
