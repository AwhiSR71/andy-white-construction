(function(root){'use strict';
const config={
  "schemaVersion": 1,
  "client": {
    "companyName": "Andy White Construction LLC",
    "ownerName": "Andrew D. White",
    "shortName": "Andy White",
    "slug": "andy-white",
    "businessEmail": "andywhitellc@gmail.com",
    "supportEmail": "andrew.white.cog@gmail.com",
    "phoneDisplay": "(503) 970-1171",
    "licenseLabel": "Oregon CCB #219851",
    "previewUrl": "https://andrewwhitecog-tech.github.io/andy-white-construction/",
    "businessDomain": "andywhiteconstruction.com",
    "facebookUrl": "https://www.facebook.com/Andy.52.ok",
    "googleBusinessUrl": "https://business.google.com/",
    "githubUsername": "AwhiSR71"
  },
  "reminderStorageKey": "andy-white-takeover-notes-v1",
  "tasks": [
    {
      "id": "preview",
      "title": "1. Look at your new website",
      "body": "Open the preview and look through your real work photos. The preview works now; andywhiteconstruction.com is still with the old provider.",
      "links": [
        [
          "Open my new website",
          "https://andrewwhitecog-tech.github.io/andy-white-construction/"
        ]
      ],
      "extra": "The business domain is not live on the new site yet. A provider handoff and working domain checks come before we call that finished."
    },
    {
      "id": "approval",
      "title": "2. Tell Andrew you want to go ahead",
      "body": "If you like the preview and want the handoff to continue, send Andrew this short message. The button opens an email draft; you check it and press Send.",
      "email": {
        "to": "andrew.white.cog@gmail.com",
        "subject": "Andy White Construction — website approval",
        "body": "I have reviewed the website preview and approve arranging the Townsquare handoff. Please copy me on the written request."
      },
      "extra": "This helper does not send email. Your written yes lets Andrew continue the provider request; it does not itself transfer any account or cancel a service."
    },
    {
      "id": "townsquare",
      "title": "3. Give Townsquare the owner’s instruction",
      "body": "Townsquare may need this directly from you. Send from andywhitellc@gmail.com, or the email already registered on the account. Andrew can prepare and follow up; Townsquare controls its identity checks and release process.",
      "email": {
        "to": "clients@townsquareinteractive.com",
        "subject": "Owner request — Andy White Construction website, domain and Google listing",
        "body": "Hello Townsquare,\n\nI am Andrew D. White, owner of Andy White Construction LLC. I authorize Andrew White Jr. (andrew.white.cog@gmail.com) to work with you on my website and domain handoff. Please copy me at andywhitellc@gmail.com on replies.\n\nMy domain is andywhiteconstruction.com. The new website preview is:\nhttps://andrewwhitecog-tech.github.io/andy-white-construction/\n\nPlease coordinate the steps to point or release my domain for this new site. Please confirm who controls the active DNS, registrar and renewal account, and how I can retain control. Please do not make a DNS change until the exact destination has been confirmed with Andrew.\n\nPlease return primary ownership of my existing Google Business Profile to me at andywhitellc@gmail.com, and tell us any required owner verification steps. Please do not create a duplicate listing.\n\nPlease cancel my remaining paid Townsquare services and confirm the effective cancellation date, any remaining charges or commitments, and whether anything else is required from me. Please preserve my domain and Google listing while the handoff is arranged.\n\nPlease confirm what you need directly from me and the expected next steps and timing.\n\nThank you,\nAndrew D. White\nAndy White Construction LLC\nandywhitellc@gmail.com",
        "cc": "andrew.white.cog@gmail.com"
      },
      "links": [
        [
          "Townsquare support",
          "https://www.townsquareinteractive.com/support/"
        ]
      ],
      "extra": "Townsquare may require your direct confirmation. We cannot promise its release, cancellation, fee decision or timing. The domain was registered through GoDaddy, but the current renewal account and DNS holder are not confirmed. The recorded renewal due date is February 19, 2027; confirm this with the account holder."
    },
    {
      "id": "github",
      "title": "4. Keep your website account",
      "body": "Your GitHub username is AwhiSR71. Your sign-in email is andywhitellc@gmail.com. Open GitHub and use the password you chose. If needed, use GitHub’s password recovery yourself.",
      "links": [
        [
          "Open GitHub sign-in",
          "https://github.com/login"
        ],
        [
          "Check my GitHub profile",
          "https://github.com/AwhiSR71"
        ]
      ],
      "extra": "The website repository has not been transferred to this account. Andrew plans that after the business domain is live. Accept only the actual GitHub transfer invitation when it arrives; GitHub transfer invitations expire after 24 hours. Do not send Andrew a password or recovery code. You do not need a GitHub phone app."
    },
    {
      "id": "google",
      "title": "5. Open your existing Google business",
      "body": "Sign in with the Google account that manages your existing business listing. Access has not been confirmed yet. If the listing is missing or asks for verification, tell Andrew what you see. Keep using the existing listing.",
      "links": [
        [
          "Open Google Business",
          "https://business.google.com/"
        ],
        [
          "Google Maps for iPhone",
          "https://apps.apple.com/us/app/google-maps/id585027354"
        ]
      ],
      "extra": "After business access works, Google Maps on iPhone can add photos: Business → More → Add photo → choose the photos → Done → Publish. The menu may differ on your version. Review the correct business before publishing. Do not create another listing."
    },
    {
      "id": "payment",
      "title": "6. Review the one-time website payment",
      "body": "The agreed checkout is $500 once, from Andrew White. It covers the website, lookbook, custom pictures, Google Business Profile work and one week of basic email support after go-live. No payment has been verified.",
      "links": [
        [
          "Review the $500 checkout",
          "https://buy.stripe.com/cNi28rfxA15r2J02jR4gg07"
        ]
      ],
      "extra": "Opening the checkout does not pay it. Check the amount and merchant before you choose to pay. Your provider’s existing bills or domain renewal are separate; ask the provider to confirm them."
    },
    {
      "id": "photos",
      "title": "7. Make posting your work easier",
      "body": "Use the photo helper below to make smaller JPEG copies and a short caption. Then save or share them and finish the post in the app you choose.",
      "links": [
        [
          "Open my existing Facebook",
          "https://www.facebook.com/Andy.52.ok"
        ],
        [
          "Facebook for iPhone",
          "https://apps.apple.com/us/app/facebook/id284882215"
        ]
      ],
      "extra": "Use your existing Facebook and Google accounts. The helper does not publish automatically, and your website does not change when you post on Facebook or Google. Website photos need a separate update."
    }
  ],
  "preparedAt": "2026-10-15T19:27:46.860Z"
};
if(typeof module==='object'&&module.exports)module.exports=config;else root.ClientConfig=config;
})(typeof globalThis!=='undefined'?globalThis:this);
