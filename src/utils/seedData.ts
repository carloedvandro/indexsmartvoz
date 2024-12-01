import { supabase } from "@/integrations/supabase/client";

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const states = ["SP", "RJ", "MG", "RS", "PR", "SC", "BA", "PE", "CE", "DF"];
const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Porto Alegre", "Curitiba", "Florianópolis", "Salvador", "Recife", "Fortaleza", "Brasília"];
const status = ["pending", "active", "blocked"];
const licenseTypes = ["basic", "premium", "professional"];
const graduationTypes = ["starter", "advanced", "expert"];

export const seedUsers = async () => {
  for (let i = 1; i <= 20; i++) {
    const stateIndex = Math.floor(Math.random() * states.length);
    const statusIndex = Math.floor(Math.random() * status.length);
    const licenseIndex = Math.floor(Math.random() * licenseTypes.length);
    const graduationIndex = Math.floor(Math.random() * graduationTypes.length);

    const userData = {
      email: `user${i}@example.com`,
      password: "password123",
      options: {
        data: {
          full_name: `Usuário Teste ${i}`,
          external_id: `EXT${String(i).padStart(5, '0')}`,
          status: status[statusIndex],
          birth_date: generateRandomDate(new Date(1970, 0, 1), new Date(2000, 0, 1)),
          person_type: Math.random() > 0.5 ? "PF" : "PJ",
          document_id: Math.floor(Math.random() * 99999999999).toString().padStart(11, '0'),
          cnpj: Math.random() > 0.5 ? Math.floor(Math.random() * 99999999999999).toString().padStart(14, '0') : null,
          phone: `(${Math.floor(Math.random() * 99)}) ${Math.floor(Math.random() * 99999)}-${Math.floor(Math.random() * 9999)}`,
          mobile: `(${Math.floor(Math.random() * 99)}) 9${Math.floor(Math.random() * 9999)}-${Math.floor(Math.random() * 9999)}`,
          address: `Rua Teste ${i}, ${Math.floor(Math.random() * 1000)}`,
          zip_code: Math.floor(Math.random() * 99999999).toString().padStart(8, '0'),
          city: cities[stateIndex],
          state: states[stateIndex],
          country: "Brasil",
          voucher: `VOUCHER${String(i).padStart(5, '0')}`,
          gender: Math.random() > 0.5 ? "M" : "F",
          civil_status: ["Solteiro", "Casado", "Divorciado"][Math.floor(Math.random() * 3)],
          license_type: licenseTypes[licenseIndex],
          graduation_type: graduationTypes[graduationIndex],
          monthly_graduation: Math.random() > 0.5,
        }
      }
    };

    try {
      const { data: authUser, error: signUpError } = await supabase.auth.signUp(userData);
      
      if (signUpError) {
        console.error("Error creating user:", signUpError);
        continue;
      }

      console.log(`Created user ${i}:`, authUser);
    } catch (error) {
      console.error(`Error creating user ${i}:`, error);
    }
  }
};