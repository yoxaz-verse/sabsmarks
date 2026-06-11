const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yjjumukvwepfyakcmjqg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqanVtdWt2d2VwZnlha2NtanFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTY4MjQxNCwiZXhwIjoyMDk1MjU4NDE0fQ.ZzqDU29F8w2P0PbXwi-v96VTU4GqCDRIC3qRclOLXWE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('team_members')
    .select('name, photo_url, status');

  if (error) {
    console.error('Error fetching team members:', error);
    return;
  }

  console.log('Team Members count:', data.length);
  console.log(JSON.stringify(data, null, 2));
}

run();
