class JournalUC {
  Journal: any;
  constructor(Journal: any) {
    this.Journal = Journal;
  }

  allJournals = async (filters: {}) => {
    return await this.Journal.allJournals(filters);
  };
  journalById = async (id: string) => {
    return await this.Journal.journalById(id);
  };
  createJournal = async (journalData: any) => {
    return await this.Journal.createJournal(journalData);
  };

  updateJournal = async (journal: any, journalData: any) => {
    return await this.Journal.updateJournal(journal, journalData);
  };

  deleteJournal = async (journal: any) => {
    return await this.Journal.deleteJournal(journal);
  };
}

export default JournalUC;
