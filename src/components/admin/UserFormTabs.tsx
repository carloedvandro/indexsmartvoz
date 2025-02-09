import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalDataTab } from "./tabs/PersonalDataTab";
import { ContactTab } from "./tabs/ContactTab";
import { AddressTab } from "./tabs/AddressTab";
import { OtherTab } from "./tabs/OtherTab";

export function UserFormTabs({ register, setValue, watch, readOnly = false }) {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
        <TabsTrigger value="contact">Contato</TabsTrigger>
        <TabsTrigger value="address">Endereço</TabsTrigger>
        <TabsTrigger value="other">Outros</TabsTrigger>
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
    </Tabs>
  );
}