import { supabase } from "@/integrations/supabase/client";

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function seedNetworkUsers() {
  try {
    // Configurações dos níveis
    const level1Count = 10;
    const level2Count = 15;
    const level3Count = 15;
    const level4Count = 10;
    
    const level1Users: string[] = [];
    const level2Users: string[] = [];
    const level3Users: string[] = [];

    // Criar usuários nível 1
    console.log("Creating level 1 users...");
    for (let i = 1; i <= level1Count; i++) {
      const { data: authData, error } = await supabase.auth.signUp({
        email: `test_level1_${i}@example.com`,
        password: "testpassword123",
        options: {
          data: {
            full_name: `Usuário Nível 1 ${i}`,
          },
        },
      });

      if (error) {
        console.error(`Error creating level 1 user ${i}:`, error);
        continue;
      }

      if (authData.user) {
        level1Users.push(authData.user.id);
        
        // Update profile with additional data
        await supabase
          .from('profiles')
          .update({
            document_id: String(i).padStart(11, '0'),
            birth_date: new Date(Date.now() - (20 * 365 * 24 * 60 * 60 * 1000) - (i * 24 * 60 * 60 * 1000)),
            phone: `11999${String(i).padStart(6, '0')}`,
            status: 'active'
          })
          .eq('id', authData.user.id);
      }

      // Wait a bit to avoid rate limiting
      await wait(100);
    }

    // Criar usuários nível 2
    console.log("Creating level 2 users...");
    for (let i = 1; i <= level2Count; i++) {
      const sponsorId = level1Users[Math.floor(Math.random() * level1Users.length)];
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: `test_level2_${i}@example.com`,
        password: "testpassword123",
        options: {
          data: {
            full_name: `Usuário Nível 2 ${i}`,
          },
        },
      });

      if (error) {
        console.error(`Error creating level 2 user ${i}:`, error);
        continue;
      }

      if (authData.user) {
        level2Users.push(authData.user.id);
        
        // Update profile with additional data and sponsor
        await supabase
          .from('profiles')
          .update({
            document_id: String(level1Count + i).padStart(11, '0'),
            birth_date: new Date(Date.now() - (25 * 365 * 24 * 60 * 60 * 1000) - (i * 24 * 60 * 60 * 1000)),
            phone: `11998${String(i).padStart(6, '0')}`,
            status: 'active',
            sponsor_id: sponsorId
          })
          .eq('id', authData.user.id);
      }

      await wait(100);
    }

    // Criar usuários nível 3
    console.log("Creating level 3 users...");
    for (let i = 1; i <= level3Count; i++) {
      const sponsorId = level2Users[Math.floor(Math.random() * level2Users.length)];
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: `test_level3_${i}@example.com`,
        password: "testpassword123",
        options: {
          data: {
            full_name: `Usuário Nível 3 ${i}`,
          },
        },
      });

      if (error) {
        console.error(`Error creating level 3 user ${i}:`, error);
        continue;
      }

      if (authData.user) {
        level3Users.push(authData.user.id);
        
        // Update profile with additional data and sponsor
        await supabase
          .from('profiles')
          .update({
            document_id: String(level1Count + level2Count + i).padStart(11, '0'),
            birth_date: new Date(Date.now() - (30 * 365 * 24 * 60 * 60 * 1000) - (i * 24 * 60 * 60 * 1000)),
            phone: `11997${String(i).padStart(6, '0')}`,
            status: 'active',
            sponsor_id: sponsorId
          })
          .eq('id', authData.user.id);
      }

      await wait(100);
    }

    // Criar usuários nível 4
    console.log("Creating level 4 users...");
    for (let i = 1; i <= level4Count; i++) {
      const sponsorId = level3Users[Math.floor(Math.random() * level3Users.length)];
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: `test_level4_${i}@example.com`,
        password: "testpassword123",
        options: {
          data: {
            full_name: `Usuário Nível 4 ${i}`,
          },
        },
      });

      if (error) {
        console.error(`Error creating level 4 user ${i}:`, error);
        continue;
      }

      if (authData.user) {
        // Update profile with additional data and sponsor
        await supabase
          .from('profiles')
          .update({
            document_id: String(level1Count + level2Count + level3Count + i).padStart(11, '0'),
            birth_date: new Date(Date.now() - (35 * 365 * 24 * 60 * 60 * 1000) - (i * 24 * 60 * 60 * 1000)),
            phone: `11996${String(i).padStart(6, '0')}`,
            status: 'active',
            sponsor_id: sponsorId
          })
          .eq('id', authData.user.id);
      }

      await wait(100);
    }

    console.log("Network seeding completed!");
    return true;
  } catch (error) {
    console.error("Error seeding network:", error);
    return false;
  }
}