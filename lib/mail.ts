type OfficeNote = {
  kind: "application" | "note";
  parentName: string;
  studentName: string;
  className: string;
  email: string;
  phone: string;
  message: string;
};

export async function notifyOffice(note: OfficeNote) {
  void note;
  return { sent: false as const };
}
