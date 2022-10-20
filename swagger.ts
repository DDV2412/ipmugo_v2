import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "IPMUGO V2",
    description: "IPMUGO Digital Library",
  },
  host: "localhost:5000",
  schemes: ["http"],
  definitions: {
    Article: {
      id: "d1e0efa8-a779-4dcf-ac0c-6e7e65460237",
      journal_id: "03de17d7-3dde-4a5a-a103-253268a26a48",
      identifier: "5182",
      publish_date: "2015-12-01T00:00:00.000Z",
      topic: "Machine Drive",
      title:
        "Backstepping Control for a Five-Phase Permanent Magnet Synchronous Motor Drive",
      abstract:
        "This paper deals with the synthesis of a speed control strategy for a five-phase permanent magnet synchronous motor (PMSM) drive based on backstepping controller. The proposed control strategy considers the nonlinearities of the system in the control law. The stability of the backstepping control strategy is proved by the Lyapunov theory. Simulated results are provided to verify the feasibility of the backstepping control strategy.",
      format: "application/pdf",
      publish_year: "2015",
      resources: "Vol 6, No 4: December 2015",
      pages: "842-852",
      doi: "10.11591/ijpeds.v6.i4.pp842-852",
      publish_language: "eng",
      file: null,
      article_parsing: null,
      keywords: null,
      date_modify: null,
    },
    Journal: {
      id: "bc767f2f-a2a0-4e7a-9a2e-d4559819a116",
      name: "IAES International Journal of Robotics and Automation (IJRA)",
      abbreviation: "IJRA",
      publisher: "Institute of Advanced Engineering and Science (IAES)",
      thumbnail:
        "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
      cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
      issn: "2089-4856",
      e_issn: "2722-2586",
      description:
        "IAES International Journal of Robotics and Automation (IJRA), ISSN 2089-4856, e-ISSN 2722-2586 is an open access international peer-reviewed journal which is providing a platform to researchers, scientists, engineers and practitioners/professionals throughout the world to publish the latest creations and achievement, future challenges and exciting applications of manufacture and applications of robots and computer systems for their control and automation, sensory feedback, and information technology to reduce the need for human work. The IJRA is aimed to publish most complete and reliable source of information on the discoveries and current developments in the mode of original articles, review articles, case reports and short communications in all areas of the field and making them freely available through online without any restrictions or any other subscriptions to researchers worldwide. It pushes the frontier of robotics into a new dimension, in which motion and intelligence play equally important roles. Its scope includes (but not limited) to the following: automation control, automation engineering, autonomous robots, biotechnology and robotics, emergence of the thinking machine, forward kinematics, household robots and automation, inverse kinematics, Jacobian and singularities, methods for teaching robots, nanotechnology and robotics (nanobots), orientation matrices, robot controller, robot structure and workspace, robotic and automation software development, robotic exploration, robotic surgery, robotic surgical procedures, robotic welding, robotics applications, robotics programming, robotics technologies, robots society and ethics, software and hardware designing for robots, spatial transformations, trajectory generation, unmanned (robotic) vehicles, etc. The journal is published by Institute of Advanced Engineering and Science (IAES) in collaboration with Intelektual Pustaka Media Utama (IPMU), and is recognized (accredited) 'SINTA 2' by the Ministry of Education, Culture, Research, and Technology of the Republic of Indonesia.",
      base_url: "https://ijra.iaescore.com/index.php/IJRA",
    },
    User: {
      id: "4ba907d9-622d-4dc9-a1e1-8540d02e5e0f",
      salutation: "Prof.",
      username: "KevinCuran",
      name: "Kevin Curran",
      photo_profile: "http://127.0.0.1:5000\\profile\\Kevin.jpg",
      email: "kj.curran@ulster.ac.uk",
      password: "$2b$12$VAYH/r00UjFuDCbuuOW1..uPXl7SZ4ZREXFCYdmzgfulHuqWYxH2a",
      google_scholar: "XuncvX4AAAAJ",
      scopus_id: null,
      orcid: "0000-0001-5237-5355",
      biograph:
        "Kevin Curran is a professor of Cyber Security at Ulster University and group leader for the Cybersecurity & Web Technologies Research Group. His achievements include winning and managing UK & European Framework projects and Technology Transfer Schemes. Prof Curran has made significant contributions to advancing the knowledge and understanding of computer networking and systems, evidenced by over 800 published works. He is perhaps most well-known for his work on location positioning within indoor environments, pervasive computing, and Internet security. His expertise has been acknowledged by invitations to present his work at international conferences, overseas universities, and research laboratories. He is a regular contributor to print, online, radio & TV news on computing & security issues. He was the recipient of an Engineering and Technology Board Visiting Lectureship for Exceptional Engineers and is an IEEE Technical Expert for Internet/Security matters since 2008. He is a member of the EPSRC Peer Review College. He is a fellow of the British Computer Society (FBCS), a senior member of the Institute of Electrical and Electronics Engineers (SMIEEE) and a fellow of the higher education academy (FHEA). Prof Curran’s stature and authority in the international community is demonstrated by his influence, particularly in relation to the direction of research in computer science. He has chaired sessions and participated in the organising committees for many highly respected international conferences and workshops. He was the founding Editor in Chief of the International Journal of Ambient Computing and Intelligence and is also a member of numerous Journal Editorial boards and international conference organising committees. He has authored several books and is the recipient of various patents. He has served as an advisor to the British Computer Society regarding the computer industry standards and is a member of BCS and IEEE Technology Specialist Groups and various other professional bodies. His more up to date research profile is at https://kevincurran.org/research",
      affiliation: "University of Ulster",
      verified: null,
    },
    InsertArticle: {
      journal_id: "42b53e2d-07ae-4e86-bc75-50a5d51f1f75",
      identifier: "123",
      publishDate: "2020-01-01",
      topic: "Computer",
      title: "Test",
      abstract: "Test",
      year: "2020",
      resources: "Vol. 1, No. 3, December 2019",
      pages: "1-10",
      doi: "doi.org",
      keywords: "test;test",
      authors: [
        {
          firstname: "Dian",
          lastname: "Putra",
          email: "Dian@maiwwl.com",
          affiliation: "IAES",
          orcid: "-",
        },
        {
          firstname: "Dian",
          lastname: "Putra",
          email: "Dian@mailw1.com",
          affiliation: "IAES",
          orcid: "-",
        },
      ],
      interests: [
        {
          name: "Acoustic Waves",
        },
      ],
    },
    Login: {
      username: "DDV2412",
      password: "DDV241297#",
    },
    Register: {
      username: "DDV241297",
      name: "Dian Dwi Vaputra",
      email: "dhyanputra24@gmail.com",
      password: "DDV241297#",
    },
    Advanced: {
      searchDefault: {
        title:
          "WhatsApp, Viber and Telegram which is Best for Instant Messaging?",
      },
      AND: [
        { identifier: "" },
        { publish_date: "" },
        { topic: "" },
        { title: "" },
        { abstract: "" },
        { publish_year: "" },
        { resources: "" },
        { pages: "" },
        { doi: "" },
        { keywords: "" },
        { "journal.name": "" },
        { "journal.abbreviation": "" },
        { "journal.publisher": "" },
        { "journal.issn": "" },
        { "journal.e_issn": "" },
        { "journal.description": "" },
        { "authors.firstname": "" },
        { "authors.lastname": "" },
      ],
      OR: [
        { identifier: "" },
        { publish_date: "" },
        { topic: "" },
        { title: "" },
        { abstract: "" },
        { publish_year: "" },
        { resources: "" },
        { pages: "" },
        { doi: "" },
        { keywords: "" },
        { "journal.name": "" },
        { "journal.abbreviation": "" },
        { "journal.publisher": "" },
        { "journal.issn": "" },
        { "journal.e_issn": "" },
        { "journal.description": "" },
        { "authors.firstname": "" },
        { "authors.lastname": "" },
      ],
      NOT: [
        { identifier: "" },
        { publish_date: "" },
        { topic: "" },
        { title: "" },
        { abstract: "" },
        { publish_year: "" },
        { resources: "" },
        { pages: "" },
        { doi: "" },
        { keywords: "" },
        { "journal.name": "" },
        { "journal.abbreviation": "" },
        { "journal.publisher": "" },
        { "journal.issn": "" },
        { "journal.e_issn": "" },
        { "journal.description": "" },
        { "authors.firstname": "" },
        { "authors.lastname": "" },
      ],
      page: "0",
      size: "15",
      sortByDate: "",
      sortByTitle: "",
      sortByRelevance: "",
      sortByCited: "",
      range: "2012-2022",
      filterByTopic: "",
      filterByJournal:
        "International Journal of Electrical and Computer Engineering (IJECE)",
    },
    SearchArticles: {
      status: "success",
      total: 17729,
      countPage: 1182,
      articles: {
        took: 161,
        timed_out: false,
        _shards: {
          total: 1,
          successful: 1,
          skipped: 0,
          failed: 0,
        },
        hits: {
          total: {
            value: 10000,
            relation: "gte",
          },
          max_score: null,
          hits: [
            {
              _index: "articles",
              _id: "4848209c-d9fb-41bf-b4d6-60b6268cb89d",
              _score: null,
              _source: {
                id: "4848209c-d9fb-41bf-b4d6-60b6268cb89d",
                journal_id: "e4286ce0-262d-4e18-a94a-24869ac84863",
                identifier: "13932",
                publish_date: "2019-08-01T00:00:00.000Z",
                topic: "ComSIS",
                title:
                  "n-Tier Modelling of Robust Key management for Secure Data Aggregation in Wireless Sensor Network",
                abstract:
                  "Security problems in Wireless Sensor Network (WSN) have been researched from more than a decade. There are various security approaches being evolving towards resisting various forms of attack using different methodologies. After reviewing the existing security approaches, it can be concluded that such security approaches are highly attack-specific and doesnt address various associated issues in WSN. It is essential for security approach to be computationally lightweight. Therefore, this paper presents a novel analytical modelling that is based on n-tier approach with a target to generate an optimized secret key that could ensure higher degree of security during the process of data aggregation in WSN. The study outcome shows that proposed system is computationally lightweight with good performance on reduced delay and reduced energy consumption. It also exhibits enhanced response time and good data delivery performance to balance the need of security and data forwarding performance in WSN.",
                format: "application/pdf",
                publish_year: "2019",
                resources: "Vol 9, No 4: August 2019",
                pages: "2682-2690",
                doi: "10.11591/ijece.v9i4.pp2682-2690",
                publish_language: "eng",
                file: null,
                article_parsing: null,
                keywords:
                  "Attack; Adversary; Cryptography; Public Key Encryption; Wireless Sensor Network.",
                date_modify: null,
                created_at: "2022-10-14T06:55:21.005Z",
                updated_at: "2022-10-14T06:55:21.005Z",
                journal: {
                  id: "e4286ce0-262d-4e18-a94a-24869ac84863",
                  name: "International Journal of Electrical and Computer Engineering (IJECE)",
                  abbreviation: "IJECE",
                  publisher:
                    "Institute of Advanced Engineering and Science (IAES)",
                  thumbnail:
                    "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
                  cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
                  issn: "2088-8708",
                  e_issn: "2722-2578",
                  description:
                    "International Journal of Electrical and Computer Engineering (IJECE), ISSN 2088-8708, e-ISSN 2722-2578 is an official publication of the Institute of Advanced Engineering and Science (IAES). The IJECE is an international open access refereed journal that has been published online since 2011. The IJECE is open to submission from scholars and experts in the wide areas of electrical, electronics, instrumentation, control, telecommunication, and computer engineering from the global world, and publishes reviews, original research articles, and short communications. This journal is indexed and abstracted by SCOPUS (Elsevier), SCImago Journal Rank (SJR), and in Top Databases and Universities. Now, this journal has SNIP: 0.688; SJR: 0.376; CiteScore: 3.2; Q2 on Computer Science and Q3 on Electrical & Electronics Engineering). Our aim is to provide an international forum for scientists and engineers to share research and ideas, and to promote the crucial field of electrical & power engineering, circuits & electronics, power electronics & drives, automation, instrumentation & control engineering, digital Signal, image & video processing, telecommunication system & technology, computer science & information technology, internet of things, big data & cloud computing, and artificial intelligence & soft computing.",
                  base_url: "https://ijece.iaescore.com/index.php/IJECE",
                  createdAt: "2022-10-14T06:23:19.816Z",
                  updatedAt: "2022-10-14T06:23:19.816Z",
                  scopus_metric: {
                    id: "99a2bdf0-4281-4126-85bf-92a48c05a099",
                    journal_id: "e4286ce0-262d-4e18-a94a-24869ac84863",
                    sjr: 0.376,
                    snip: 0.688,
                    citeScore: 3.2,
                    year: "2021",
                    trackScore: 3.3,
                    trackYear: "2022",
                  },
                },
                authors: [
                  {
                    id: "5d52d196-82d2-4898-a29c-26457d2169f9",
                    article_id: "4848209c-d9fb-41bf-b4d6-60b6268cb89d",
                    firstname: "K N Narashinha",
                    lastname: "Murthy",
                    email: null,
                    affiliation: null,
                    orcid: null,
                  },
                  {
                    id: "3837d660-7fe2-4f9b-9424-31be1dee9551",
                    article_id: "4848209c-d9fb-41bf-b4d6-60b6268cb89d",
                    firstname: "Jyoti",
                    lastname: "Metan",
                    email: null,
                    affiliation: null,
                    orcid: null,
                  },
                ],
                interests: [],
                assign_author: [],
                citations: [
                  {
                    id: "a28e97fb-45a0-4614-845d-2fc731af193b",
                    article_id: "4848209c-d9fb-41bf-b4d6-60b6268cb89d",
                    count: 3,
                    source: "Scopus",
                  },
                  {
                    id: "681a1103-ba2e-48f9-b764-e9bb2596999b",
                    article_id: "4848209c-d9fb-41bf-b4d6-60b6268cb89d",
                    count: 0,
                    source: "Crossref",
                  },
                ],
              },
              sort: [
                "n-Tier Modelling of Robust Key management for Secure Data Aggregation in Wireless Sensor Network",
              ],
            },
          ],
        },
      },
      aggregations: {
        journal: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: "Indonesian Journal of Electrical Engineering and Computer Science (IJEECS)",
              doc_count: 4273,
            },
          ],
        },
        topic: {
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
          buckets: [
            {
              key: "Computer",
              doc_count: 1316,
            },
          ],
        },
        min_year: {
          value: 1080777600000,
          value_as_string: "2004",
        },
        max_year: {
          value: 1680307200000,
          value_as_string: "2023",
        },
      },
    },
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Enter your bearer token in the format **Bearer &lt;token>**",
    },
  },
};

const outputFile = "./docs/docs.json";
const endpointsFiles = ["./app.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r);
});
