export type DocumentKey = "birthCertificate" | "passportPhoto" | "fatherPhoto" | "aadharCard";

export type DocumentSlot = {
  key: DocumentKey;
  label: string;
  hint: string;
  accept: string;
  types: readonly string[];
  max: number;
  required: boolean;
};

export const DOCUMENT_SLOTS: readonly DocumentSlot[] = [
  {
    key: "birthCertificate",
    label: "Birth certificate",
    hint: "PDF, JPG or PNG, up to 5 MB",
    accept: ".pdf,.jpg,.jpeg,.png",
    types: ["application/pdf", "image/jpeg", "image/png"],
    max: 5 * 1024 * 1024,
    required: true,
  },
  {
    key: "passportPhoto",
    label: "Passport size photo",
    hint: "JPG or PNG, up to 2 MB",
    accept: ".jpg,.jpeg,.png",
    types: ["image/jpeg", "image/png"],
    max: 2 * 1024 * 1024,
    required: true,
  },
  {
    key: "fatherPhoto",
    label: "Father photograph",
    hint: "JPG or PNG, up to 2 MB",
    accept: ".jpg,.jpeg,.png",
    types: ["image/jpeg", "image/png"],
    max: 2 * 1024 * 1024,
    required: false,
  },
  {
    key: "aadharCard",
    label: "Aadhar card",
    hint: "PDF, up to 5 MB",
    accept: ".pdf",
    types: ["application/pdf"],
    max: 5 * 1024 * 1024,
    required: false,
  },
];

export function documentSlot(key: string) {
  return DOCUMENT_SLOTS.find((slot) => slot.key === key);
}

export function documentExtension(type: string) {
  if (type === "application/pdf") return "pdf";
  if (type === "image/png") return "png";
  return "jpg";
}
