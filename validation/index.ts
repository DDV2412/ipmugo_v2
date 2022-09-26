import joi from "joi";

export default {
  journal: (body: {}) => {
    return joi
      .object()
      .keys({
        name: joi.string().required().messages({
          "string.empty": "Journal name cannot be an empty field",
          "any.required": "Journal name is required field",
        }),
        abbreviation: joi.string().required().messages({
          "string.empty": "Journal abbreviation cannot be an empty field",
          "any.required": "Journal abbreviation is required field",
        }),
        publisher: joi.string().required().messages({
          "string.empty": "Publisher cannot be an empty field",
          "any.required": "Publisher is required field",
        }),
        thumbnail: joi.string().required().messages({
          "string.empty": "Journal thumbnail cannot be an empty field",
          "any.required": "Journal thumbnail is required field",
        }),
        cover: joi.string().required().messages({
          "string.empty": "Journal cover cannot be an empty field",
          "any.required": "Journal cover is required field",
        }),
        issn: joi.string().required().messages({
          "string.empty": "Journal ISSN cannot be an empty field",
          "any.required": "Journal ISSN is required field",
        }),
        e_issn: joi.string().required().messages({
          "string.empty": "Journal E_ISSN cannot be an empty field",
          "any.required": "Journal E_ISSN is required field",
        }),
        description: joi.string().required().messages({
          "string.empty": "Journal description cannot be an empty field",
          "any.required": "Journal description is required field",
        }),
        base_url: joi.string().required().messages({
          "string.empty": "Journal URL cannot be an empty field",
          "any.required": "Journal URL is required field",
        }),
        interests: joi.array().items(
          joi.object().keys({
            name: joi.string().required().messages({
              "string.empty": "Interest name cannot be an empty field",
              "any.required": "Interest name is required",
            }),
          })
        ),
      })
      .validate(body);
  },
  article: (body: {}) => {
    return joi
      .object()
      .keys({
        journal_id: joi.string().required().messages({
          "string.empty": "Journal ID cannot be an empty field",
          "any.required": "Journal ID is required",
        }),
        identifier: joi.string().required().messages({
          "string.empty": "OJS ID cannot be an empty field",
          "any.required": "OJS ID is required",
        }),
        publishDate: joi.string().required().messages({
          "string.empty": "Publish date cannot be an empty field",
          "any.required": "Publish date is required",
        }),
        topic: joi.string().required().messages({
          "string.empty": "Topic cannot be an empty field",
          "any.required": "Topic is required",
        }),
        title: joi.string().required().messages({
          "string.empty": "Title cannot be an empty field",
          "any.required": "Title is required",
        }),
        abstract: joi.string().required().messages({
          "string.empty": "Abstract cannot be an empty field",
          "any.required": "Abstract is required",
        }),
        year: joi.string().required().messages({
          "string.empty": "Year cannot be an empty field",
          "any.required": "Year is required",
        }),
        resources: joi.string().required().messages({
          "string.empty": "Resources cannot be an empty field",
          "any.required": "Resources is required",
        }),
        pages: joi.string().required().messages({
          "string.empty": "Pages cannot be an empty field",
          "any.required": "Pages is required",
        }),
        doi: joi.string().required().messages({
          "string.empty": "Doi cannot be an empty field",
          "any.required": "Doi is required",
        }),
        keywords: joi.string().required().messages({
          "string.empty": "Keywords cannot be an empty field",
          "any.required": "Keywords is required",
        }),
        authors: joi.array().items(
          joi.object().keys({
            firstname: joi.string().required().messages({
              "string.empty": "Author firstname cannot be an empty field",
              "any.required": "Author firstname is required",
            }),
            lastname: joi.string().required().messages({
              "string.empty": "Author lastname cannot be an empty field",
              "any.required": "Author lastname is required",
            }),
            email: joi.string().email().required().messages({
              "string.empty": "Author email cannot be an empty field",
              "any.required": "Author email is required",
              "string.email": `Please insert a valid email address'`,
            }),
            affiliation: joi.string().required().messages({
              "string.empty": "Author affiliation cannot be an empty field",
              "any.required": "Author affiliation is required",
            }),
            orcid: joi.string().required().messages({
              "string.empty": "Author orcid cannot be an empty field",
              "any.required": "Author orcid is required",
            }),
          })
        ),
        interests: joi.array().items(
          joi.object().keys({
            name: joi.string().required().messages({
              "string.empty": "Interest name cannot be an empty field",
              "any.required": "Interest name is required",
            }),
          })
        ),
      })
      .validate(body);
  },

  interest: (body: {}) => {
    return joi
      .object()
      .keys({
        name: joi.string().required().messages({
          "string.empty": "Interest name cannot be an empty field",
          "any.required": "Interest name is required field",
        }),
      })
      .validate(body);
  },
};
