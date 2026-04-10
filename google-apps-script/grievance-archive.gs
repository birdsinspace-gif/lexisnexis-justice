const PRIVATE_SHEET_NAME = 'Private Submissions';
const PUBLIC_SHEET_NAME = 'Public Archive';

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const privateSheet = getOrCreatePrivateSheet_(spreadsheet);
    const publicSheet = getOrCreatePublicSheet_(spreadsheet);

    const submittedAt = payload.submittedAt || new Date().toISOString();
    const employeeId = createEmployeeId_();
    const anonymousSubmission = toBoolean_(payload.anonymousSubmission || payload.submitAnonymously);

    privateSheet.appendRow([
      submittedAt,
      employeeId,
      payload.fullName || '',
      payload.email || '',
      payload.phone || '',
      payload.employmentStatus || '',
      payload.employmentStart || '',
      payload.employmentEnd || '',
      payload.position || '',
      payload.grievance || '',
      payload.criminalActivity || '',
      anonymousSubmission,
      toBoolean_(payload.agree),
      payload.source || 'lexisnexis-justice',
      JSON.stringify(payload),
    ]);

    publicSheet.appendRow([
      submittedAt,
      anonymousSubmission ? 'Anonymous' : `Employee #${employeeId}`,
      payload.employmentStatus || '',
      payload.employmentStart || '',
      payload.employmentEnd || '',
      payload.position || '',
      payload.grievance || '',
      payload.criminalActivity || '',
      payload.source || 'lexisnexis-justice',
    ]);

    return jsonResponse_({
      ok: true,
      employeeId,
      publicName: anonymousSubmission ? 'Anonymous' : `Employee #${employeeId}`,
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: String(error),
    });
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing POST body');
  }

  const contentType = e.postData.type || '';
  if (contentType.indexOf('application/json') !== -1) {
    return JSON.parse(e.postData.contents);
  }

  return e.parameter || {};
}

function getOrCreatePrivateSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(PRIVATE_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(PRIVATE_SHEET_NAME);
    sheet.appendRow([
      'submittedAt',
      'employeeId',
      'fullName',
      'email',
      'phone',
      'employmentStatus',
      'employmentStart',
      'employmentEnd',
      'position',
      'grievance',
      'criminalActivity',
      'anonymousSubmission',
      'agree',
      'source',
      'rawPayload',
    ]);
  }
  return sheet;
}

function getOrCreatePublicSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(PUBLIC_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(PUBLIC_SHEET_NAME);
    sheet.appendRow([
      'submittedAt',
      'publicName',
      'employmentStatus',
      'employmentStart',
      'employmentEnd',
      'position',
      'grievance',
      'criminalActivity',
      'source',
    ]);
  }
  return sheet;
}

function createEmployeeId_() {
  return Math.floor(1000 + Math.random() * 9000);
}

function toBoolean_(value) {
  return value === true || value === 'true' || value === 'on' || value === '1';
}

function jsonResponse_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
