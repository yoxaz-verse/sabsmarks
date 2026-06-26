const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yjjumukvwepfyakcmjqg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqanVtdWt2d2VwZnlha2NtanFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTY4MjQxNCwiZXhwIjoyMDk1MjU4NDE0fQ.ZzqDU29F8w2P0PbXwi-v96VTU4GqCDRIC3qRclOLXWE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: selectData, error: selectError } = await supabase
    .from('site_settings')
    .select('*');

  if (selectError) {
    console.error('Error fetching site_settings:', selectError);
    return;
  }

  console.log('Current site settings:', selectData);

  const { data, error } = await supabase
    .from('site_settings')
    .update({ head_office_map_url: 'https://maps.app.goo.gl/banPywyzCS4ZsYpWA' })
    .eq('id', '00000000-0000-0000-0000-000000000001');

  if (error) {
    console.error('Error updating map URL:', error);
    return;
  }

  console.log('Update result:', data);

  const { data: verifyData } = await supabase
    .from('site_settings')
    .select('*');
  console.log('Verified site settings:', verifyData);
}

run();
