class JournalUC {
  Journal: any;
  constructor(Journal: any) {
    this.Journal = Journal;
  }

  allJournals = async (
    page: number,
    size: number,
    filters: Record<string, string>
  ) => {
    return await this.Journal.allJournals(page, size, filters);
  };

  journalById = async (id: string) => {
    return await this.Journal.journalById(id);
  };
  createJournal = async (journalData: any) => {
    return await this.Journal.createJournal(journalData);
  };

  updateJournal = async (
    journal_id: string,
    journalData: Record<string, any>
  ) => {
    return await this.Journal.updateJournal(journal_id, journalData);
  };

  deleteJournal = async (journal_id: string) => {
    return await this.Journal.deleteJournal(journal_id);
  };
}

export default JournalUC;
