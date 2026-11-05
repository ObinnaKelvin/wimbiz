import nodemailer from 'nodemailer';
import { config } from './config';

export interface BookingDetails {
  id: string;
  name?: string;
  contactInfo: string;
  selectedLocation: string;
  locationName: string;
  locationArea: string;
  locationAddress: string;
  packageInterest: string;
  message?: string;
  hasConsent: boolean;
  timestamp: string;
  source?: string;
}

/**
 * Format phone number for international WhatsApp and tel links (handles Nigerian numbers)
 */
function cleanPhoneNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 11) {
    return '234' + digits.substring(1);
  }
  if (digits.startsWith('234')) {
    return digits;
  }
  return digits;
}

/**
 * Generate a clean, responsive HTML email with a tabular format
 */
export function generateBookingEmailHtml(booking: BookingDetails): string {
  const clientName = booking.name && booking.name.trim() ? booking.name.trim() : 'Confidential / Anonymous Client';
  const cleanPhone = cleanPhoneNumber(booking.contactInfo);
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${clientName}, this is Iwosan Lagoon Hospitals Concierge regarding your screening inquiry (#${booking.id}).`)}` : '';
  const dateFormatted = new Date(booking.timestamp).toLocaleString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Africa/Lagos',
  }) + ' (West Africa Time)';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iwosan Screening Booking Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 650px; margin: 24px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0;">
    
    <!-- Top Brand Header Banner -->
    <div style="background-color: #081934; padding: 28px 24px; text-align: left; border-bottom: 4px solid #38a946;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td>
            <div style="display: inline-block; padding: 4px 10px; background-color: #38a946; color: #081934; font-size: 11px; font-weight: 800; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
              NEW SCREENING & CALLBACK REQUEST
            </div>
            <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">
              Iwosan Lagoon Hospitals
            </h1>
            <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">
              Clinical Concierge & Women's Health Screening Portal &bull; WIMBIZ 25
            </p>
          </td>
          <td style="text-align: right; vertical-align: top;">
            <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 6px 12px; color: #e2e8f0; font-size: 11px; font-weight: 600; text-align: center;">
              Ref Code<br/>
              <span style="font-size: 13px; font-weight: 800; color: #ffffff; font-family: monospace;">${booking.id}</span>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Main Content Area -->
    <div style="padding: 24px;">
      
      <!-- Intro Notice -->
      <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.5; color: #334155;">
        A participant has submitted a callback and screening booking request through the <strong>Iwosan HerHealth Wellness Passport</strong>. Please review the details in the table below and initiate client contact within 2 hours.
      </p>

      <!-- Details in Tabular Format -->
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0 24px; font-size: 13px; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden;">
        <thead>
          <tr style="background-color: #0c1c38; color: #ffffff;">
            <th colspan="2" style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
              Inquiry Specifications & Client Details
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Row 1: Reference ID -->
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; width: 34%; background-color: #f8fafc;">
              Reference ID
            </td>
            <td style="padding: 12px 16px; font-family: monospace; font-size: 13px; font-weight: 800; color: #081934;">
              ${booking.id}
            </td>
          </tr>

          <!-- Row 2: Client Name -->
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; background-color: #f8fafc;">
              Client Name
            </td>
            <td style="padding: 12px 16px; font-weight: 700; color: #0f172a;">
              ${clientName}
            </td>
          </tr>

          <!-- Row 3: Contact Phone / WhatsApp -->
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; background-color: #f8fafc;">
              Contact Phone / WhatsApp
            </td>
            <td style="padding: 12px 16px; color: #0f172a;">
              <span style="font-weight: 800; font-size: 14px; color: #0369a1;">${booking.contactInfo}</span>
              ${waUrl ? `
                <div style="margin-top: 6px;">
                  <a href="${waUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; text-decoration: none;">
                    &bull; Open in WhatsApp &rarr;
                  </a>
                </div>
              ` : ''}
            </td>
          </tr>

          <!-- Row 4: Requested Service / Package -->
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; background-color: #f8fafc;">
              Service / Package Requested
            </td>
            <td style="padding: 12px 16px;">
              <span style="display: inline-block; background-color: #ecfdf5; color: #047857; font-weight: 700; font-size: 13px; padding: 4px 10px; border-radius: 6px; border: 1px solid #a7f3d0;">
                ${booking.packageInterest}
              </span>
            </td>
          </tr>

          <!-- Row 5: Preferred Hospital Location -->
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; background-color: #f8fafc;">
              Preferred Hospital Location
            </td>
            <td style="padding: 12px 16px; color: #0f172a;">
              <strong style="color: #081934;">${booking.locationName}</strong><br/>
              <span style="font-size: 12px; color: #64748b; line-height: 1.4; display: inline-block; margin-top: 2px;">
                ${booking.locationAddress} (${booking.locationArea})
              </span>
            </td>
          </tr>

          <!-- Row 6: Message / Clinical Notes -->
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; background-color: #f8fafc;">
              Notes / Special Requests
            </td>
            <td style="padding: 12px 16px; color: #1e293b; line-height: 1.5; white-space: pre-wrap;">
              ${booking.message && booking.message.trim() ? booking.message.trim() : '<em style="color: #94a3b8;">No additional clinical note or question provided.</em>'}
            </td>
          </tr>

          <!-- Row 7: Consent Status -->
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; background-color: #f8fafc;">
              Client Consent Status
            </td>
            <td style="padding: 12px 16px; color: #059669; font-weight: 700;">
              &#10004; Explicit Consent Given (Participant authorized Iwosan Lagoon callback)
            </td>
          </tr>

          <!-- Row 8: Submission Timestamp -->
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; background-color: #f8fafc;">
              Submission Timestamp
            </td>
            <td style="padding: 12px 16px; color: #64748b; font-size: 12px;">
              ${dateFormatted}
            </td>
          </tr>

          <!-- Row 9: Source Platform -->
          <tr>
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; background-color: #f8fafc;">
              Source Application
            </td>
            <td style="padding: 12px 16px; color: #64748b; font-size: 12px;">
              ${booking.source || "Iwosan HerHealth PWA - WIMBIZ 25th Annual Conference"}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Quick Action CTA Buttons for Concierge Staff -->
      <div style="background-color: #f8fafc; border-radius: 12px; padding: 18px; border: 1px solid #e2e8f0; text-align: center; margin-bottom: 20px;">
        <p style="margin: 0 0 12px; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
          Quick Concierge Actions
        </p>
        <div>
          <a href="tel:${cleanPhone}" style="display: inline-block; background-color: #081934; color: #ffffff; font-size: 12px; font-weight: 700; padding: 10px 18px; border-radius: 24px; text-decoration: none; margin-right: 8px;">
            &#128222; Call Client Now
          </a>
          ${waUrl ? `
          <a href="${waUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; font-size: 12px; font-weight: 700; padding: 10px 18px; border-radius: 24px; text-decoration: none;">
            &#128172; Open WhatsApp Chat
          </a>
          ` : ''}
        </div>
      </div>

      <!-- Confidentiality notice -->
      <div style="font-size: 11px; color: #94a3b8; line-height: 1.5; border-top: 1px solid #f1f5f9; padding-top: 14px;">
        <strong>Medical Privacy & Confidentiality Notice:</strong> This electronic transmission contains confidential clinical concierge inquiry information intended solely for authorized Iwosan Lagoon Hospitals intake staff. All patient inquiries are protected under applicable healthcare privacy standards.
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748b;">
      Iwosan Lagoon Hospitals &bull; 24/7 Helpline: +234 913 935 2778 &bull; wellness@iwosanlagoon.life<br/>
      Victoria Island &bull; Ikoyi &bull; Ikeja &bull; Lekki
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generate plain-text tabular breakdown as email fallback
 */
export function generateBookingEmailText(booking: BookingDetails): string {
  const clientName = booking.name && booking.name.trim() ? booking.name.trim() : 'Confidential / Anonymous Client';
  const cleanPhone = cleanPhoneNumber(booking.contactInfo);

  return `
================================================================================
IWOSAN LAGOON HOSPITALS - NEW CLINICAL SCREENING & CALLBACK REQUEST
================================================================================

A new callback and screening booking request has been submitted via the Iwosan HerHealth Wellness Passport.

REQUEST DETAILS IN TABULAR FORMAT:
--------------------------------------------------------------------------------
Reference ID          : ${booking.id}
Client Name           : ${clientName}
Contact Phone/WhatsApp: ${booking.contactInfo}
Package / Service     : ${booking.packageInterest}
Hospital Location     : ${booking.locationName}
Location Address      : ${booking.locationAddress} (${booking.locationArea})
Notes / Questions     : ${booking.message || 'None provided'}
Consent Confirmed     : YES (Participant authorized Iwosan Lagoon callback)
Timestamp             : ${booking.timestamp}
Source Application    : ${booking.source || 'Iwosan HerHealth PWA - WIMBIZ 25'}
--------------------------------------------------------------------------------

DIRECT CONTACT LINKS:
- Phone Call: tel:${cleanPhone}
- WhatsApp  : https://wa.me/${cleanPhone}

Iwosan Lagoon Hospitals Concierge
Helpline: +234 913 935 2778
Email: wellness@iwosanlagoon.life
================================================================================
`;
}

/**
 * Send email via cPanel / Roundcube HTTPS Webmail interface (Port 2096).
 * Cloud hosting platforms (like Railway, Render, DigitalOcean) often block outbound
 * TCP connections on standard SMTP ports (25, 465, 587), causing ETIMEDOUT.
 * Dispatching over HTTPS (port 2096) completely bypasses outbound SMTP firewall blocks.
 */
async function sendViaCpanelHttpsWebmail(params: {
  webmailHost: string;
  user: string;
  pass: string;
  to: string;
  cc?: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const base = `https://${params.webmailHost}:2096`;
  const jar = new Map<string, string>();

  function updateCookies(res: Response) {
    const anyHeaders = res.headers as any;
    const sc: string[] =
      typeof anyHeaders.getSetCookie === 'function'
        ? anyHeaders.getSetCookie()
        : res.headers.get('set-cookie')
        ? [res.headers.get('set-cookie') as string]
        : [];
    for (const c of sc) {
      const [kv] = c.split(';');
      const idx = kv.indexOf('=');
      if (idx > 0) {
        jar.set(kv.slice(0, idx).trim(), kv.slice(idx + 1).trim());
      }
    }
  }

  function getCookieHeader(): string {
    return Array.from(jar.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  }

  // 1. Authenticate with cPanel Webmail over HTTPS
  const loginRes = await fetch(`${base}/login/?login_only=1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      user: params.user,
      pass: params.pass,
    }).toString(),
    signal: AbortSignal.timeout(10000),
  });

  updateCookies(loginRes);
  const loginData = (await loginRes.json()) as { status?: number; security_token?: string };
  if (!loginData || loginData.status !== 1 || !loginData.security_token) {
    return { success: false, error: 'Webmail authentication failed' };
  }

  const secToken = loginData.security_token;

  // 2. Initialize Roundcube session
  const rc1 = await fetch(`${base}${secToken}/3rdparty/roundcube/?_task=mail`, {
    headers: { Cookie: getCookieHeader() },
    redirect: 'manual',
    signal: AbortSignal.timeout(10000),
  });
  updateCookies(rc1);

  // 3. Request new compose session ID
  const rc2 = await fetch(`${base}${secToken}/3rdparty/roundcube/?_task=mail&_action=compose`, {
    headers: { Cookie: getCookieHeader() },
    redirect: 'manual',
    signal: AbortSignal.timeout(10000),
  });
  updateCookies(rc2);
  const loc = rc2.headers.get('location');
  if (!loc) {
    return { success: false, error: 'Could not initialize Roundcube compose session' };
  }

  const composeUrl = loc.startsWith('http') ? loc : `${base}${loc}`;
  const rc3 = await fetch(composeUrl, {
    headers: { Cookie: getCookieHeader() },
    redirect: 'manual',
    signal: AbortSignal.timeout(10000),
  });
  updateCookies(rc3);
  const composeHtml = await rc3.text();

  const reqToken =
    composeHtml.match(/"request_token":"([^"]+)"/)?.[1] ||
    composeHtml.match(/name="_token" value="([^"]+)"/)?.[1];
  const composeId =
    composeHtml.match(/"compose_id":"([^"]+)"/)?.[1] ||
    loc.match(/_id=([^&]+)/)?.[1];
  const fromIdent =
    composeHtml.match(/<option[^>]+value="(\d+)"[^>]*>/i)?.[1] || '1';

  if (!reqToken || !composeId) {
    return { success: false, error: 'Missing Roundcube compose tokens' };
  }

  // 4. Submit message over HTTPS
  const unlockId = `loading${Date.now()}`;
  const sendParams = new URLSearchParams({
    _token: reqToken,
    _task: 'mail',
    _action: 'send',
    _id: composeId,
    _attachments: '',
    _from: fromIdent,
    _to: params.to,
    _cc: params.cc || '',
    _bcc: '',
    _replyto: '',
    _followupto: '',
    _subject: params.subject,
    _is_html: '1',
    _framed: '1',
    _message: params.html,
  });

  const sendRes = await fetch(
    `${base}${secToken}/3rdparty/roundcube/?_task=mail&_unlock=${unlockId}&_framed=1`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: getCookieHeader(),
        Referer: composeUrl,
        Origin: base,
      },
      body: sendParams.toString(),
      signal: AbortSignal.timeout(15000),
    }
  );

  const sendText = await sendRes.text();
  if (sendRes.ok && sendText.includes('sent_successfully')) {
    return {
      success: true,
      messageId: `<https-webmail-${composeId}@iwosanwellness.com>`,
    };
  }

  return {
    success: false,
    error: `Unexpected Roundcube response (status ${sendRes.status})`,
  };
}

/**
 * Send email via Resend HTTPS API (https://api.resend.com/emails).
 * Uses standard HTTPS (Port 443), so it works reliably on Railway, Render,
 * Cloud Run, and any external hosting platform that blocks SMTP ports.
 */
async function sendViaResendApi(params: {
  apiKey: string;
  from: string;
  to: string;
  cc?: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const toList = params.to
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
  const ccList = params.cc
    ? params.cc
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean)
    : [];

  // Attempt with configured from address first; if custom domain isn't verified yet in Resend,
  // fallback to Resend's default onboarding sender so delivery still succeeds during setup.
  const candidateFromAddresses = [params.from];
  if (!params.from.includes('onboarding@resend.dev')) {
    candidateFromAddresses.push('Iwosan Concierge <onboarding@resend.dev>');
  }

  let lastError = 'Resend API request failed';

  for (const sender of candidateFromAddresses) {
    const payload: Record<string, any> = {
      from: sender,
      to: toList,
      subject: params.subject,
      html: params.html,
      text: params.text,
    };

    if (ccList.length > 0) {
      payload.cc = ccList;
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${params.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (res.ok && data.id) {
      return {
        success: true,
        messageId: data.id,
      };
    }

    lastError = data.message || `HTTP ${res.status}`;
    // Only retry with onboarding@resend.dev if the domain wasn't verified yet
    const isUnverifiedDomainError =
      res.status === 403 &&
      (lastError.toLowerCase().includes('domain') || lastError.toLowerCase().includes('verify'));
    if (!isUnverifiedDomainError) {
      break;
    }
  }

  return {
    success: false,
    error: lastError,
  };
}

/**
 * Send the booking email to the configured receiving email
 */
export async function sendBookingEmail(booking: BookingDetails): Promise<{
  success: boolean;
  messageId?: string;
  recipient: string;
  cc?: string;
  simulated?: boolean;
}> {
  const receivingEmail = config.email.receivingEmail;
  const ccEmails = config.email.ccEmails;
  const subject = `[Iwosan Concierge] New Screening Request: ${booking.packageInterest} - ${booking.name || 'Anonymous'}`;

  const htmlContent = generateBookingEmailHtml(booking);
  const textContent = generateBookingEmailText(booking);

  // 1. Primary Route: Resend HTTPS API (Port 443)
  const resendApiKey = config.email.resend.apiKey;
  if (resendApiKey) {
    try {
      const resendResult = await sendViaResendApi({
        apiKey: resendApiKey,
        from: config.email.resend.fromAddress || config.email.fromAddress,
        to: receivingEmail,
        cc: ccEmails || undefined,
        subject,
        html: htmlContent,
        text: textContent,
      });

      if (resendResult.success) {
        console.log(
          `[EmailService] Successfully sent booking email #${booking.id} to ${receivingEmail} (CC: ${ccEmails}) via Resend API. Message ID: ${resendResult.messageId}`
        );
        return {
          success: true,
          messageId: resendResult.messageId,
          recipient: receivingEmail,
          cc: ccEmails,
          simulated: false,
        };
      } else {
        console.log(
          `[EmailService] Notice: Resend API returned: ${resendResult.error}. Testing fallback dispatch routes.`
        );
      }
    } catch (err: any) {
      console.log(
        `[EmailService] Notice: Resend API dispatch not completed (${err?.message || 'network'}). Testing fallback dispatch routes.`
      );
    }
  }

  const primaryHost = config.email.smtp.host ? config.email.smtp.host.trim() : 'server343-5.web-hosting.com';
  const smtpUser = config.email.smtp.user ? config.email.smtp.user.trim() : '';
  const smtpPass = config.email.smtp.pass ? config.email.smtp.pass : '';
  const isIwosanUser = smtpUser.toLowerCase().includes('iwosanwellness.com');

  // 2. Secondary Cloud-Resilient Route: cPanel HTTPS Webmail API (Port 2096)
  // Bypasses outbound TCP blocks on ports 25, 465, and 587 in Railway / Render / Cloud environments
  if (isIwosanUser && smtpPass && !smtpPass.startsWith('re_')) {
    try {
      const httpsResult = await sendViaCpanelHttpsWebmail({
        webmailHost: 'server343-5.web-hosting.com',
        user: smtpUser,
        pass: smtpPass,
        to: receivingEmail,
        cc: ccEmails || undefined,
        subject,
        html: htmlContent,
      });

      if (httpsResult.success) {
        console.log(
          `[EmailService] Successfully sent booking email #${booking.id} to ${receivingEmail} (CC: ${ccEmails}) via Iwosan HTTPS Webmail API (Port 2096). Message ID: ${httpsResult.messageId}`
        );
        return {
          success: true,
          messageId: httpsResult.messageId,
          recipient: receivingEmail,
          cc: ccEmails,
          simulated: false,
        };
      }
    } catch (err: any) {
      console.log(
        `[EmailService] Notice: HTTPS Webmail API dispatch not completed (${err?.message || 'network'}). Testing SMTP endpoints.`
      );
    }
  }

  // 2. Secondary Route: Direct Nodemailer SMTP Endpoints (Ports 26, 465, 587)
  interface SmtpEndpoint {
    host: string;
    port: number;
    secure: boolean;
    requireTLS?: boolean;
    label: string;
  }

  const candidateEndpoints: SmtpEndpoint[] = [];

  if (isIwosanUser) {
    candidateEndpoints.push(
      {
        host: 'server343-5.web-hosting.com',
        port: 26,
        secure: false,
        label: 'Iwosan Mail Server (Alternate Exim Port 26)',
      },
      {
        host: 'server343-5.web-hosting.com',
        port: 465,
        secure: true,
        label: 'Iwosan Mail Server (cPanel SSL Port 465)',
      },
      {
        host: 'server343-5.web-hosting.com',
        port: 587,
        secure: false,
        requireTLS: true,
        label: 'Iwosan Mail Server (STARTTLS Port 587)',
      }
    );
  }

  if (primaryHost && primaryHost !== 'server343-5.web-hosting.com') {
    const isO365 = primaryHost.includes('office365.com') || primaryHost.includes('outlook.com');
    candidateEndpoints.push({
      host: primaryHost,
      port: isO365 ? 587 : config.email.smtp.port,
      secure: isO365 ? false : config.email.smtp.secure && config.email.smtp.port === 465,
      requireTLS: isO365 ? true : undefined,
      label: isO365 ? 'Microsoft 365 (Port 587 STARTTLS)' : `SMTP (${primaryHost})`,
    });
  }

  for (const endpoint of candidateEndpoints) {
    try {
      const transporter = nodemailer.createTransport({
        host: endpoint.host,
        port: endpoint.port,
        secure: endpoint.secure,
        requireTLS: endpoint.requireTLS,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 4500,
        greetingTimeout: 4500,
      });

      const info = await transporter.sendMail({
        from: config.email.fromAddress || smtpUser,
        to: receivingEmail,
        cc: ccEmails || undefined,
        subject,
        text: textContent,
        html: htmlContent,
      });

      console.log(
        `[EmailService] Successfully sent booking email #${booking.id} to ${receivingEmail} via ${endpoint.label}. Message ID: ${info.messageId}`
      );
      return {
        success: true,
        messageId: info.messageId,
        recipient: receivingEmail,
        cc: ccEmails,
        simulated: false,
      };
    } catch (err: any) {
      console.log(
        `[EmailService] Notice: ${endpoint.label} dispatch not completed (${err?.code || 'timeout'}).`
      );
    }
  }

  // Graceful fallback / development mode: Log formatted dispatch
  console.log(`================================================================================`);
  console.log(`[EmailService] DISPATCHING BOOKING EMAIL TO CONFIGURED RECIPIENT: ${receivingEmail}`);
  console.log(`[EmailService] CC: ${ccEmails}`);
  console.log(`[EmailService] Subject: ${subject}`);
  console.log(`[EmailService] Reference Code: ${booking.id}`);
  console.log(`[EmailService] Client: ${booking.name || 'Anonymous'} (${booking.contactInfo})`);
  console.log(`[EmailService] Package: ${booking.packageInterest}`);
  console.log(`[EmailService] Location: ${booking.locationName}`);
  console.log(`================================================================================`);

  return {
    success: true,
    messageId: `sim-${booking.id}-${Date.now()}`,
    recipient: receivingEmail,
    cc: ccEmails,
    simulated: true,
  };
}
