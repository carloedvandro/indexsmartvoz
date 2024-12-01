import { supabase } from "@/integrations/supabase/client";

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function seedNetworkUsers() {
  try {
    // Configurações dos níveis
    const level1Count = 3; // Quantidade menor para teste inicial
    const level2Count = 4;
    const level3Count = 5;
    const level4Count = 3;
    
    const level1Users: string[] = [];
    const level2Users: string[] = [];
    const level3Users: string[] = [];

    // Criar usuários nível 1
    console.log("Criando usuários nível 1...");
    for (let i = 1; i <= level1Count; i++) {
      const email = `teste_nivel1_${i}@exemplo.com`;
      const { data: authData, error } = await supabase.auth.signUp({
        email: email,
        password: "senha123456",
        options: {
          data: {
            full_name: `Usuário Nível 1 - ${i}`,
          },
        },
      });

      if (error) {
        console.error(`Erro ao criar usuário nível 1 ${i}:`, error);
        continue;
      }

      if (authData.user) {
        level1Users.push(authData.user.id);
        
        // Atualizar perfil com dados adicionais
        await supabase
          .from('profiles')
          .update({
            document_id: `111${String(i).padStart(8, '0')}`,
            status: 'active',
            custom_id: `N1-${i}`
          })
          .eq('id', authData.user.id);
      }

      await wait(1000); // Esperar 1 segundo entre cada criação
    }

    // Criar usuários nível 2
    console.log("Criando usuários nível 2...");
    for (let i = 1; i <= level2Count; i++) {
      const sponsorId = level1Users[Math.floor(Math.random() * level1Users.length)];
      const email = `teste_nivel2_${i}@exemplo.com`;
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: email,
        password: "senha123456",
        options: {
          data: {
            full_name: `Usuário Nível 2 - ${i}`,
          },
        },
      });

      if (error) {
        console.error(`Erro ao criar usuário nível 2 ${i}:`, error);
        continue;
      }

      if (authData.user) {
        level2Users.push(authData.user.id);
        
        await supabase
          .from('profiles')
          .update({
            document_id: `222${String(i).padStart(8, '0')}`,
            status: 'active',
            sponsor_id: sponsorId,
            custom_id: `N2-${i}`
          })
          .eq('id', authData.user.id);
      }

      await wait(1000);
    }

    // Criar usuários nível 3
    console.log("Criando usuários nível 3...");
    for (let i = 1; i <= level3Count; i++) {
      const sponsorId = level2Users[Math.floor(Math.random() * level2Users.length)];
      const email = `teste_nivel3_${i}@exemplo.com`;
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: email,
        password: "senha123456",
        options: {
          data: {
            full_name: `Usuário Nível 3 - ${i}`,
          },
        },
      });

      if (error) {
        console.error(`Erro ao criar usuário nível 3 ${i}:`, error);
        continue;
      }

      if (authData.user) {
        level3Users.push(authData.user.id);
        
        await supabase
          .from('profiles')
          .update({
            document_id: `333${String(i).padStart(8, '0')}`,
            status: 'active',
            sponsor_id: sponsorId,
            custom_id: `N3-${i}`
          })
          .eq('id', authData.user.id);
      }

      await wait(1000);
    }

    // Criar usuários nível 4
    console.log("Criando usuários nível 4...");
    for (let i = 1; i <= level4Count; i++) {
      const sponsorId = level3Users[Math.floor(Math.random() * level3Users.length)];
      const email = `teste_nivel4_${i}@exemplo.com`;
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: email,
        password: "senha123456",
        options: {
          data: {
            full_name: `Usuário Nível 4 - ${i}`,
          },
        },
      });

      if (error) {
        console.error(`Erro ao criar usuário nível 4 ${i}:`, error);
        continue;
      }

      if (authData.user) {
        await supabase
          .from('profiles')
          .update({
            document_id: `444${String(i).padStart(8, '0')}`,
            status: 'active',
            sponsor_id: sponsorId,
            custom_id: `N4-${i}`
          })
          .eq('id', authData.user.id);
      }

      await wait(1000);
    }

    console.log("Criação de usuários concluída!");
    return true;
  } catch (error) {
    console.error("Erro ao criar usuários:", error);
    return false;
  }
}