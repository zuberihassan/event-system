const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: './db.sqlite' },
  useNullAsDefault: true
});
const app = express();
app.use(bodyParser.json());
app.use(require('cors')());

// DATABASE SETUP
async function init() {
  if (!await knex.schema.hasTable('attendees')) {
    await knex.schema.createTable('attendees', t => {
      t.increments('id');
      t.string('name');
      t.string('email');
      t.string('token').unique();
      t.boolean('checked_in').defaultTo(false);
      t.timestamp('checked_in_at').nullable();
    });
  }
}
init();

// CHECK TOKEN
app.get('/api/validate/:token', async (req, res) => {
  const token = req.params.token;
  const att = await knex('attendees').where({ token }).first();
  if (!att) return res.json({ ok:false, error:'not found' });
  if (att.checked_in) return res.json({ ok:true, status:'already_checked_in', attendee: att });
  return res.json({ ok:true, status:'ok', attendee: att });
});

// CHECK IN
app.post('/api/checkin', async (req, res) => {
  const { token } = req.body;
  const att = await knex('attendees').where({ token }).first();
  if (!att) return res.json({ ok:false, error:'not found' });

  if (att.checked_in)
    return res.json({ ok:true, status:'already_checked_in', attendee: att });

  await knex('attendees').where({ token }).update({
    checked_in: true,
    checked_in_at: knex.fn.now()
  });

  const updated = await knex('attendees').where({ token }).first();
  res.json({ ok:true, status:'checked_in', attendee: updated });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
