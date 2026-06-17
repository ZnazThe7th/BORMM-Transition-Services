// Google Workspace API helper functions

const getHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export const addClientToSheet = async (token: string, data: any) => {
  const driveRes = await fetch('https://www.googleapis.com/drive/v3/files?q=name="Clients" and mimeType="application/vnd.google-apps.spreadsheet"', {
    headers: getHeaders(token),
  });
  const driveData = await driveRes.json();
  
  let spreadsheetId = driveData.files?.[0]?.id;
  
  if (!spreadsheetId) {
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({
        properties: { title: 'Clients' },
        sheets: [{
          properties: { title: 'Sheet1' }
        }]
      })
    });
    const newSheet = await createRes.json();
    spreadsheetId = newSheet.spreadsheetId;
    
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:E1:append?valueInputOption=USER_ENTERED`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({
        values: [['Date', 'Name', 'Email', 'Phone', 'Service']]
      })
    });
  }

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({
      values: [[new Date().toISOString(), data.name, data.email, data.phone, data.service]]
    })
  });
};

export const createCalendarEvent = async (token: string, data: any, withMeet: boolean = false) => {
  const event: any = {
    summary: `BORMM Transition: ${data.service} for ${data.name}`,
    description: `Booking from ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}`,
    start: {
      dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    attendees: [
      { email: data.email }
    ]
  };

  if (withMeet) {
    event.conferenceData = {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' }
      }
    };
  }

  const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(event)
  });
  
  return res.json();
};

export const sendNotificationEmail = async (token: string, adminEmail: string, data: any) => {
  const subject = `New Booking: ${data.service} - ${data.name}`;
  const body = `You have a new booking!\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\n\nPlease review in your Calendar/Sheets.`;
  
  const rawEmail = [
    `To: ${adminEmail}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    body
  ].join('\r\n');

  const encodedEmail = btoa(rawEmail).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ raw: encodedEmail })
  });
};

export const addTasks = async (token: string, data: any) => {
  const tlRes = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
    headers: getHeaders(token),
  });
  const tlData = await tlRes.json();
  const listId = tlData.items?.[0]?.id || '@default';

  await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({
      title: `Review booking from ${data.name} (${data.service})`,
      notes: `Contact: ${data.email} | ${data.phone}`
    })
  });
};

export const addContact = async (token: string, data: any) => {
  await fetch('https://people.googleapis.com/v1/people:createContact', {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({
      names: [{ givenName: data.name }],
      emailAddresses: [{ value: data.email }],
      phoneNumbers: [{ value: data.phone }]
    })
  });
};
