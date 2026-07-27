/* ════════════════════════════════════════════════════════════
   CourtBook — Configuration
   ════════════════════════════════════════════════════════════

   ⚠️  ΣΥΜΠΛΗΡΩΣΕ ΤΑ 2 ΠΑΡΑΚΑΤΩ απ' το Supabase:
       Supabase Dashboard → Project Settings → API
       - "Project URL"      →  SUPABASE_URL
       - "anon / public key" →  SUPABASE_ANON_KEY

   Το anon key είναι ΑΣΦΑΛΕΣ να φαίνεται στον browser — η ασφάλεια
   γίνεται μέσω των RLS policies στη βάση, όχι μέσω κρυφού κλειδιού.
   ════════════════════════════════════════════════════════════ */

const CB_CONFIG = {
    SUPABASE_URL:      "https://kbyfeyljlcjvgmiytyut.supabase.co",
    SUPABASE_ANON_KEY: "sb_publishable_0mnIpqoRecCFXy1uWxnUaA_B3vrxlvF",

    // Brand (άλλαξέ τα όποτε θες)
    BRAND_NAME:  "CourtBook",
    BRAND_TAGLINE: "Online κρατήσεις για Padel & Tennis clubs",

    // ── EmailJS: ΑΠΕΝΕΡΓΟΠΟΙΗΜΕΝΟ ──────────────────────────────
    // Χρησιμοποιούμε Resend (Edge Function notify-booking) που έχει
    // μεγαλύτερο όριο (3.000/μήνα vs 200 του EmailJS). Κενό = off.
    EJS_PUBLIC_KEY: "",
    EJS_SERVICE:    "",
    EJS_TPL_BOOK:   "",
    EJS_TPL_CANCEL: "",

    // Defaults για νέα clubs
    DEFAULT_OPEN_HOUR:    9,
    DEFAULT_CLOSE_HOUR:   23,
    DEFAULT_SLOT_MINUTES: 30
};
