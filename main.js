const banks = [
  {
    samaCode: "55",
    bankName: "Banque Saudi Fransi",
    nameEn: "Banque Saudi Fransi",
    nameAr: "البنك السعودي الفرنسي",
  },
  {
    samaCode: "80",
    bankName: "Alrajhi Bank",
    nameEn: "Alrajhi Bank",
    nameAr: "بنك الراجحي",
  },
  {
    samaCode: "10",
    bankName: "National Commercial Bank",
    nameEn: "National Commercial Bank",
    nameAr: "البنك الأهلي التجاري",
  },
  {
    samaCode: "45",
    bankName: "Saudi British Bank",
    nameEn: "SABB",
    nameAr: "ساب",
  },
  {
    samaCode: "20",
    bankName: "Riyadh Bank",
    nameEn: "Riyad Bank",
    nameAr: "بنك الرياض",
  },
  {
    samaCode: "40",
    bankName: "Saudi American Bank",
    nameEn: "SAMBA",
    nameAr: "سامبا",
  },
  {
    samaCode: "05",
    bankName: "Alinma Bank",
    nameEn: "AL Inma Bank",
    nameAr: "بنك الانماء",
  },
  {
    samaCode: "50",
    bankName: "Alawwal bank",
    nameEn: "AlAwwal Bank",
    nameAr: "البنك الأول",
  },
  {
    samaCode: "60",
    bankName: "Bank AlJazira",
    nameEn: "Bank Aljazerah",
    nameAr: "بنك الجزيرة",
  },
  {
    samaCode: "65",
    bankName: "Saudi Investment Bank",
    nameEn: "Saudi Investment Bank",
    nameAr: "البنك السعودي للأستثمار",
  },
  {
    samaCode: "15",
    bankName: "Bank AlBilad ",
    nameEn: "BANK ALBELAD",
    nameAr: "بنك البلاد",
  },
  {
    samaCode: "30",
    bankName: "Arab National Bank",
    nameEn: "Arab National Bank",
    nameAr: "البنك العربي الوطني",
  },
  {
    samaCode: "90",
    bankName: "GULF Bank",
    nameEn: "Gulf International Bank",
    nameAr: "بنك الخليج",
  },
  {
    samaCode: "95",
    bankName: "Emirates Bank",
    nameEn: "EMARITE BANK",
    nameAr: "بنك الامارات",
  },
  {
    samaCode: "76",
    bankName: "Bank Muscat",
    nameEn: "Bank Muscat",
    nameAr: "بنك مسقط",
  },
  {
    samaCode: "71",
    bankName: "National Bank of Bahrain",
    nameEn: "National Bank Of Bahrain",
    nameAr: "بنك البحرين الوطني",
  },
  {
    samaCode: "75",
    bankName: "National Bank of Kuwait",
    nameEn: "National Bank of Kuwait",
    nameAr: "بنك الكويت الوطني",
  },
  {
    samaCode: "85",
    bankName: "BNP Paribas Bank",
    nameEn: "BNP PARIBAS SAUDI ARABIA",
    nameAr: "بي ان بي باريبوس",
  },
];

function checkIban(iban) {
  // Ensure the IBAN is 22 characters long
  if (!iban || iban.length < 22) {
    return {
      valid: false,
      message: "The IBAN must be 22 characters long for Saudi Arabia.",
    };
  }

  const countryCode = iban.substring(0, 2); // First two characters for country code
  const checksum = iban.substring(2, 4);
  const samaCode = iban.substring(4, 6); // SAMA code starts after SA** (position 4–5)

  if (countryCode !== "SA") {
    return {
      valid: false,
      message:
        "Invalid country code. IBAN should start with 'SA' for Saudi Arabia.",
    };
  }

  if (!/^\d{2}$/.test(checksum)) {
    return {
      valid: false,
      message: "Invalid checksum. The checksum should be 2 digits.",
    };
  }

  // Ensure to compare SAMA code as a string (add leading zero if necessary)
  const bank = banks.find((b) => b.samaCode === samaCode);
  if (!bank) {
    return {
      valid: false,
      message: `Invalid SAMA code: ${samaCode}. No bank found for this code.`,
    };
  }

  return { valid: true, bank }; // Return the bank if everything matches
}

function getIban() {
  const iban = document.getElementById("iban").value.trim().replace(/\s+/g, ""); // Remove spaces and trim input
  const result = document.getElementById("result");
  const validation = checkIban(iban);

  if (!validation.valid) {
    result.className = "text-danger text-center"; // Assign a Bootstrap class for red text
    result.innerHTML = validation.message;
  } else {
    const bank = validation.bank;
    result.className = "text-success text-center"; // Assign a Bootstrap class for green text
    result.innerHTML = `
      <strong>The IBAN is correct and belongs to:</strong><br>
      <span><strong>Bank:</strong> ${bank.nameEn} (${bank.nameAr})</span><br>
      <span><strong>SAMA Code:</strong> ${bank.samaCode}</span><br>
      <span><strong>Bank Name:</strong> ${bank.bankName}</span>
    `;
  }
}
