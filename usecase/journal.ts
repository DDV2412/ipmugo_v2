class JournalUC {
  Journal: any;
  constructor(Journal: any) {
    this.Journal = Journal;
  }

  allJournals = async () => {
    return await this.Journal.allJournals();
  };

  searchByElastic = async (filters: {}) => {
    return await this.Journal.searchByElastic(filters);
  };
  journalById = async (id: string) => {
    return await this.Journal.journalById(id);
  };
  createJournal = async (journalData: {}) => {
    return await this.Journal.createJournal(journalData);
  };

  updateJournal = async (journal_id: string, journalData: {}) => {
    return await this.Journal.updateJournal(journal_id, journalData);
  };

  deleteJournal = async (journal_id: string) => {
    return await this.Journal.deleteJournal(journal_id);
  };
}

export default JournalUC;
