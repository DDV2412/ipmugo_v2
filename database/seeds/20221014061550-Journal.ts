import { CreationAttributes, QueryInterface } from "sequelize";
import Journal from "../../models/journal";
import { journal } from "../../types/models/journal";
import JournalType = journal.Journal;

export = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const JournalObject: CreationAttributes<JournalType>[] = [
        {
          name: "International Journal of Power Electronics and Drive Systems (IJPEDS)",
          abbreviation: "IJPEDS",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2088-8694",
          e_issn: "2722-256X",
          description:
            "The International Journal of Power Electronics and Drive Systems (IJPEDS), p-ISSN: 2088-8694, e-ISSN 2722-256X, is the official publication of the Institute of Advanced Engineering and Science (IAES). This is a SCOPUS indexed journal, SJR Q3 on Electrical and Electronics Engineering, CiteScore: 3.3, SJR: 0.346, and SNIP: 0.638. The scope of the journal includes all issues in the field of power electronics and drive systems. Included are techniques for advanced power semiconductor devices; control in power electronics; low and high power converters (inverters, converters, controlled and uncontrolled rectifiers); control algorithms and techniques applied to power electronics; electromagnetic and thermal performance of electronic power converters and inverters; power quality and utility applications; renewable energy; electric machines; modelling, simulation, analysis, design and implementations of the application of power circuit components (power semiconductors, inductors, high frequency transformers, capacitors), EMI/EMC considerations; power devices and components; integrated and packaged; induction motor drives; synchronous motor drives; synchronous motor drives; permanent magnet motor drives; ASDs (adjustable speed drives); multi-phase machines and converters; applications in motor drives; electric vehicles; wind energy systems; solar; battery chargers; UPS; and other applications.",
          base_url: "https://ijpeds.iaescore.com/index.php/IJPEDS",
        },

        {
          name: "International Journal of Electrical and Computer Engineering (IJECE)",
          abbreviation: "IJECE",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2088-8708",
          e_issn: "2722-2578",
          description:
            "International Journal of Electrical and Computer Engineering (IJECE), ISSN 2088-8708, e-ISSN 2722-2578 is an official publication of the Institute of Advanced Engineering and Science (IAES). The IJECE is an international open access refereed journal that has been published online since 2011. The IJECE is open to submission from scholars and experts in the wide areas of electrical, electronics, instrumentation, control, telecommunication, and computer engineering from the global world, and publishes reviews, original research articles, and short communications. This journal is indexed and abstracted by SCOPUS (Elsevier), SCImago Journal Rank (SJR), and in Top Databases and Universities. Now, this journal has SNIP: 0.688; SJR: 0.376; CiteScore: 3.2; Q2 on Computer Science and Q3 on Electrical & Electronics Engineering). Our aim is to provide an international forum for scientists and engineers to share research and ideas, and to promote the crucial field of electrical & power engineering, circuits & electronics, power electronics & drives, automation, instrumentation & control engineering, digital Signal, image & video processing, telecommunication system & technology, computer science & information technology, internet of things, big data & cloud computing, and artificial intelligence & soft computing.",
          base_url: "https://ijece.iaescore.com/index.php/IJECE",
        },

        {
          name: "International Journal of Public Health Science (IJPHS)",
          abbreviation: "IJPHS",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2252-8806",
          e_issn: "2620-4126",
          description:
            "International Journal of Public Health Science (IJPHS) p-ISSN: 2252-8806, e-ISSN: 2620-4126 is an interdisciplinary journal that publishes material on all aspects of public health science. This journal is published by Intelektual Pustaka Media Utama (IPMU) in collaboration with Institute of Advanced Engineering and Science (IAES). The IJPHS provides the ideal platform for the discussion of more sophisticated public health research and practice for authors and readers worldwide. The priorities are originality and excellence. The journal welcomes high-impact articles on emerging public health science that covers (but not limited) to epidemiology, biostatistics, nutrition, family health, infectious diseases, health services research, gerontology, child health, adolescent health, behavioral medicine, rural health, chronic diseases, health promotion, evaluation and intervention, public health policy and management, health economics, occupational health and environmental health. This journal is  indexed by Scopus and accredited SINTA 1 by Ministry of Research and Technology/National Research and Innovation Agency, Republic of Indonesia (RISTEK-BRIN). All published papers since 2020 issues were included in scopus.com.",
          base_url: "https://ijphs.iaescore.com/index.php/IJPHS",
        },

        {
          name: "International Journal of Evaluation and Research in Education (IJERE)",
          abbreviation: "IJERE",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2252-8822",
          e_issn: "2620-5440",
          description:
            "The International Journal of Evaluation and Research in Education (IJERE), p-ISSN: 2252-8822, e-ISSN: 2620-5440 is an interdisciplinary publication of original research and writing on education which publishes papers to international audiences of educational researchers. This journal aims to provide a forum for scholarly understanding of the field of education and plays an important role in promoting the process that accumulated knowledge, values, and skills are transmitted from one generation to another; and to make methods and contents of evaluation and research in education available to teachers, administrators and research workers. The journal encompasses a variety of topics, including child development, curriculum, reading comprehension, philosophies of education and educational approaches, etc. The IJERE has been indexed by SCOPUS and ERIC Institute of Education Sciences (IES) of the U.S. Department of Education. ",
          base_url: "https://ijere.iaescore.com/index.php/IJERE",
        },

        {
          name: "Indonesian Journal of Electrical Engineering and Computer Science (IJEECS)",
          abbreviation: "IJEECS",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2502-4752",
          e_issn: "2502-4760",
          description:
            "The Indonesian Journal of Electrical Engineering and Computer Science (IJEECS), p-ISSN: 2502-4752, e-ISSN: 2502-4760 is a monthly peer-reviewed international journal in English, indexed by Scopus (CiteScore 2021: 2.4, SNIP 2021: 0.513, SJR 2021: 0.276, Scimagojr Q3 on Electrical and Electronic Engineering, Q3 on Computer Networks and Communications, Q3 on Signal Processing, and Q3 on Control and Optimization), EI (INSPEC, IET), Google Scholar Metrics, ProQuest, EBSCO, BASE, Microsoft Academic, Scinapse, SHERPA/RoMEO, etc. The purpose of this publication is to disseminate high-quality articles that are devoted to discussing any and all elements of the most recent and noteworthy advancements in the fields of electrical engineering and computer science. The applications of telecommunications and information technology, applied computing and computer science, instrumentation and control engineering, electrical engineering (power), and electronics engineering are all included in its purview. ",
          base_url: "https://ijeecs.iaescore.com/index.php/IJEECS",
        },

        {
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

        {
          name: "International Journal of Reconfigurable and Embedded Systems (IJRES)",
          abbreviation: "IJRES",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2089-4864",
          e_issn: "2722-2608",
          description:
            "The goal of the International Journal of Reconfigurable and Embedded Systems (IJRES), p-ISSN 2089-4864, e-ISSN 2722-2608, is to give academics, industry professionals, educators, and policymakers who work in the field a way to share innovative and important new work on reconfigurable systems, embedded systems, very large-scale integration (VLSI) design, and the internet of things (IoT). With VLSI system level integration and reconfigurable cores in system-on-chip (SoC) and embedded IoT devices, the center of gravity of the computer industry is moving from personal computing to embedded computing. Reconfigurable and embedded systems are becoming more and more important parts of all kinds of complex technical systems, such as audio-visual equipment, phones, cars, toys, airplanes, medical diagnostics, pacemakers, climate control systems, manufacturing systems, intelligent power systems, security systems, weapons, etc. The journal is put out by the Institute of Advanced Engineering and Science (IAES) in collaboration with Intelektual Pustaka Media Utama (IPMU). The IJRES is an OPEN ACCESS and PEER-REVIEWED journal distributed under the terms and conditions of the Creative Commons Attribution-ShareAlike 4.0 International License. Scopus has indexed this journal's published articles beginning with the 2021 issue.",
          base_url: "https://ijres.iaescore.com/index.php/IJRES",
        },

        {
          name: "International Journal of Advances in Applied Sciences (IJAAS)",
          abbreviation: "IJAAS",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2252-8814",
          e_issn: "2722-2594",
          description:
            "International Journal of Advances in Applied Sciences (IJAAS), p-ISSN 2252-8814, e-ISSN 2722-2594, is a peer-reviewed and open access journal dedicated to publish significant research findings in the field of Applied Sciences, Engineering and Information Technology. The IJAAS is designed to serve researchers, developers, professionals, graduate students and others interested in state-of-the art research activities in applied science, engineering and information technology areas, which cover topics including: applied physics; applied chemistry; applied biology; environmental and earth sciences; electrical & electronic engineering; instrumentation & control; telecommunications & computer science; industrial engineering; materials & manufacturing; mechanical, mechatronics & civil engineering; food, chemical & agricultural engineering; and acoustic & music engineering. This journal is published by Institute of Advanced Engineering and Science (IAES) in collaboration with Intelektual Pustaka Media Utama (IPMU), and is recognized (accredited) 'SINTA 2' by the Ministry of Education, Culture, Research, and Technology of the Republic of Indonesia.",
          base_url: "https://ijaas.iaescore.com/index.php/IJAAS",
        },

        {
          name: "International Journal of Applied Power Engineering (IJAPE)",
          abbreviation: "IJAPE",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2252-8792",
          e_issn: "2722-2624",
          description:
            "International Journal of Applied Power Engineering (IJAPE), p-ISSN 2252-8792, e-ISSN 2722-2624 focuses on the applied works in the areas of power generation, transmission and distribution, sustainable energy, applications of power control in large power systems, etc. The main objective of IJAPE is to bring out the latest practices in research in the above mentioned areas for efficient and cost effective operations of power systems and electrical energy sources. The journal covers, but not limited to, the following scope: electric power generation, transmission and distribution, utilization of electric power, energy conversion, electrical machinery, sustainable energy, insulation, solar energy, high-power semiconductors, power quality, power economic, FACTS, renewable energy, electromagnetic compatibility, electrical engineering materials, high voltage insulation technologies, high voltage apparatuses, lightning, protection system, power system analysis, SCADA, electrical measurements, and the electrical apparatus connected to such systems. The journal is published by Institute of Advanced Engineering and Science (IAES) in collaboration with Intelektual Pustaka Media Utama (IPMU) and Universitas Ahmad Dahlan (UAD).",
          base_url: "https://ijape.iaescore.com/index.php/IJAPE",
        },

        {
          name: "International Journal of Informatics and Communication Technology (IJ-ICT)",
          abbreviation: "IJICT",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2252-8776",
          e_issn: "2722-2616",
          description:
            "The International Journal of Informatics and Communication Technology (IJ-ICT), p-ISSN 2252-8776, e-ISSN 2722-2616, is a common platform for publishing quality research papers as well as other intellectual outputs. This journal is published by the Institute of Advanced Engineering and Science (IAES) in collaboration with Intelektual Pustaka Media Utama (IPMU) and Universitas Ahmad Dahlan (UAD), whose aims are to promote the dissemination of scientific knowledge and technology in the information and communication technology areas in front of an international audience of the scientific community, to encourage the progress and innovation of technology for human life, and also to be the best platform for the proliferation of ideas and thoughts for all scientists, regardless of their locations or nationalities. The journal covers all areas of Informatics and Communication Technology (ICT) and focuses on integrating hardware and software solutions for storage, retrieval, sharing and manipulation management, analysis, visualization, interpretation, and its applications for human services programs and practices. It publishes refereed original research articles and technical notes. It is designed to serve researchers, developers, managers, strategic planners, graduate students, and others interested in state-of-the-art research activities in ICT.",
          base_url: "https://ijict.iaescore.com/index.php/IJICT",
        },

        {
          name: "Computer Science and Information Technologies",
          abbreviation: "CSIT",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2722-323X",
          e_issn: "2722-3221",
          description:
            "Computer Science and Information Technologies ISSN 2722-323X, e-ISSN 2722-3221 is an open access, peer-reviewed international journal that publishes original research article, review papers, short communications that will have an immediate impact on the ongoing research in all areas of Computer Science/Informatics, Electronics, Communication and Information Technologies. Papers for publication in this journal are selected through rigorous peer review, to ensure originality, timeliness, relevance, and readability. This journal is published by Institute of Advanced Engineering and Science (IAES) in collaboration with Intelektual Pustaka Media Utama (IPMU). The journal is published four-monthly (March, July and November).",
          base_url: "https://iaesprime.com/index.php/csit",
        },

        {
          name: "TELKOMNIKA (Telecommunication, Computing, Electronics and Control)",
          abbreviation: "TELKOMNIKA",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "1693-6930",
          e_issn: "2302-9293",
          description:
            "TELKOMNIKA (Telecommunication, Computing, Electronics and Control) ISSN: 1693-6930, e-ISSN: 2302-9293 is a peer-reviewed, scientific journal published by Universitas Ahmad Dahlan (UAD) in collaboration with Institute of Advanced Engineering and Science (IAES). The aim of this journal is to publish high-quality articles dedicated to all aspects of the latest outstanding developments in the field of electrical & electronics engineering and computer science. Its scope encompasses the applications of Telecommunication, Computing, Electrical & Electronics, and Instrumentation & Control. It was first published in 2003. Beginning with issue 1 of volume 16 (2018), TELKOMNIKA will be published as a bimonthly journal (6 issues/year). The journal registered in the CrossRef system with Digital Object Identifier (DOI) prefix 10.12928. The Journal has been indexed by SCOPUS, Google Scholar, Scholar Metrics etc; accredited 'A' Grade by DGHE (Ministry of Research, Technology and Higher Education, Republic of Indonesia); registered BASE - Bielefeld Academic Search Engine and CORE KMi, etc. The journal also has a license agreement with  ProQuest LLC and EBSCO Publishing.",
          base_url: "http://telkomnika.uad.ac.id/index.php/TELKOMNIKA",
        },

        {
          name: "Bulletin of Electrical Engineering and Informatics (BEEI)",
          abbreviation: "EEI",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2089-3191",
          e_issn: "2302-9285",
          description:
            "The Bulletin of Electrical Engineering and Informatics (BEEI), ISSN: 2089-3191, e-ISSN: 2302-9285, is open to submissions from scholars and experts in the wide areas of electrical engineering and informatics from around the world. The BEEI is an open-access peer-reviewed journal published by the Institute of Advanced Engineering and Science (IAES) in collaboration with Intelektual Pustaka Media Utama (IPMU) that continuously presents the results of original research, reviews, surveys, or new data/concepts across all electrical engineering, electronics, instrumentation, control, robotics, telecommunication, computer engineering, information systems, information technology, and informatics (computer science) fields of interest. Articles must be understandable and written in standard English. This journal is indexed by Scopus (Elsevier)/ScimagoJR and has SNIP: 0.730, CiteScore: 2.4, and SJR: 0.357. The Ministry of Education, Culture, Research, and Technology of the Republic of Indonesia has given this journal its SINTA 1 (S1) seal of approval. This journal is published bimonthly (February, April, June, August, October & December) in both print and online versions. All publications are available in full text and are free to download.",
          base_url: "https://beei.org/index.php/EEI",
        },

        {
          name: "Journal of Education and Learning (EduLearn)",
          abbreviation: "EduLearn",
          publisher: "Institute of Advanced Engineering and Science (IAES)",
          thumbnail:
            "http://127.0.0.1:5000\\thumbnail\\IJPEDS - Journal Cover web.jpg",
          cover: "http://127.0.0.1:5000\\cover\\03  IJPEDS 2021.jpg",
          issn: "2089-9823",
          e_issn: "2302-9277",
          description:
            "Journal of Education and Learning (EduLearn) ISSN: 2089-9823, e-ISSN 2302-9277 is a multi-disciplinary, peer-refereed open-access international journal which has been established for the dissemination of state-of-the-art knowledge in the field of education, teaching, development, instruction, educational projects and innovations, learning methodologies and new technologies in education and learning. The EduLearn is published by Intelektual Pustaka Media Utama (IPMU) in collaboration with Institute of Advanced Engineering and Science (IAES) and Universitas Ahmad Dahlan (UAD). ",
          base_url: "http://edulearn.intelektual.org/index.php/EduLearn",
        },
      ];

      await Journal.bulkCreate<JournalType>(JournalObject, {
        validate: true,
        individualHooks: true,
        transaction,
      });
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete(Journal.tableName, {}, {});
    });
  },
};
