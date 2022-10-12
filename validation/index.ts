import joi from "joi";

export default {
  journal: (body: Record<string, string>) => {
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
        interests: joi
          .array()
          .required()
          .items(
            joi
              .object()
              .required()
              .keys({
                name: joi.string().required().messages({
                  "string.empty": "Interest name cannot be an empty field",
                  "any.required": "Interest name is required",
                }),
              })
          )
          .messages({
            "any.required": "Interest is required",
          }),
      })
      .validate(body);
  },
  article: (body: Record<string, string>) => {
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
        publish_year: joi.string().required().messages({
          "string.empty": "Publish year cannot be an empty field",
          "any.required": "Publish year is required",
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
        authors: joi
          .array()
          .required()
          .items(
            joi
              .object()
              .required()
              .keys({
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
                orcid: joi
                  .string()
                  .required()
                  .messages({
                    "string.empty": "Author orcid cannot be an empty field",
                    "any.required": "Author orcid is required",
                  })
                  .messages({
                    "any.required": "Authors is required",
                  }),
              })
          ),
        interests: joi
          .array()
          .required()
          .items(
            joi
              .object()
              .required()
              .keys({
                name: joi.string().required().messages({
                  "string.empty": "Interest name cannot be an empty field",
                  "any.required": "Interest name is required",
                }),
              })
          )
          .messages({
            "any.required": "Interest is required",
          }),
      })
      .validate(body);
  },

  interest: (body: Record<string, string>) => {
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

  register: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        username: joi.string().required().messages({
          "string.empty": "Username cannot be an empty field",
          "any.required": "Username is required field",
        }),
        name: joi.string().required().messages({
          "string.empty": "Name cannot be an empty field",
          "any.required": "Name is required field",
        }),
        email: joi.string().required().email().messages({
          "string.empty": "Email cannot be an empty field",
          "any.required": `Email is a required field`,
          "string.email": `Please insert a valid email address'`,
        }),
        password: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
      })
      .validate(body);
  },

  login: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        username: joi.string().required().messages({
          "string.empty": "Username cannot be an empty field",
          "any.required": "Username is required field",
        }),
        password: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
      })
      .validate(body);
  },

  user: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        username: joi.string().required().messages({
          "string.empty": "Username cannot be an empty field",
          "any.required": "Username is required field",
        }),
        name: joi.string().required().messages({
          "string.empty": "Name cannot be an empty field",
          "any.required": "Name is required field",
        }),
        email: joi.string().required().email().messages({
          "string.empty": "Email cannot be an empty field",
          "any.required": `Email is a required field`,
          "string.email": `Please insert a valid email address'`,
        }),
        password: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
        roles: joi
          .array()
          .required()
          .items(
            joi
              .object()
              .required()
              .keys({
                role_name: joi.string().required().messages({
                  "string.empty": "Role name cannot be an empty field",
                  "any.required": "Role name is required field",
                }),
              })
          )
          .messages({
            "any.required": "Roles is required",
          }),
      })
      .validate(body);
  },

  profileUpdate: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        username: joi.string().required().messages({
          "string.empty": "Username cannot be an empty field",
          "any.required": "Username is required field",
        }),
        name: joi.string().required().messages({
          "string.empty": "Name cannot be an empty field",
          "any.required": "Name is required field",
        }),
        email: joi.string().required().email().messages({
          "string.empty": "Email cannot be an empty field",
          "any.required": `Email is a required field`,
          "string.email": `Please insert a valid email address'`,
        }),
        password: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
      })
      .validate(body);
  },

  forgotPass: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        email: joi.string().required().email().messages({
          "string.empty": "Email cannot be an empty field",
          "any.required": `Email is a required field`,
          "string.email": `Please insert a valid email address'`,
        }),
      })
      .validate(body);
  },

  resetPassword: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        password: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
        confirmPassword: joi
          .string()
          .required()
          .min(8)
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .messages({
            "string.empty": "Confirm password cannot be an empty field",
            "string.pattern.base":
              "Invalid confirm password, alphanumeric and characters",
            "string.min": `Confirm password should have a minimum length of {#limit}`,
            "any.required": `Confirm password is a required field`,
          }),
      })
      .validate(body);
  },

  role: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        role_name: joi.string().required().messages({
          "string.empty": "Role name cannot be an empty field",
          "any.required": "Role name is required field",
        }),
      })
      .validate(body);
  },

  bookmarks: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        bookmarks: joi
          .array()
          .required()
          .items(
            joi
              .object()
              .required()
              .keys({
                article_id: joi.string().required().messages({
                  "string.empty": "Article ID cannot be an empty field",
                  "any.required": "Article ID is required field",
                }),
              })
          ),
      })
      .validate(body);
  },

  assignAuthor: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        authors: joi
          .array()
          .required()
          .items(
            joi
              .object()
              .required()
              .keys({
                article_id: joi.string().required().messages({
                  "string.empty": "Article ID cannot be an empty field",
                  "any.required": "Article ID is required field",
                }),
                author_id: joi.string().required().messages({
                  "string.empty": "Author ID cannot be an empty field",
                  "any.required": "Author ID is required field",
                }),
              })
          ),
      })
      .validate(body);
  },

  assignEditor: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        editors: joi
          .array()
          .required()
          .items(
            joi
              .object()
              .required()
              .keys({
                journal_id: joi.string().required().messages({
                  "string.empty": "Journal ID cannot be an empty field",
                  "any.required": "Journal ID is required field",
                }),
                editor_id: joi.string().required().messages({
                  "string.empty": "Editor ID cannot be an empty field",
                  "any.required": "Editor ID is required field",
                }),
              })
          ),
      })
      .validate(body);
  },

  citations: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        citations: joi
          .array()
          .required()
          .items(
            joi
              .object()
              .required()
              .keys({
                doi: joi.string().required().messages({
                  "string.empty": "DOI cannot be an empty field",
                  "any.required": "DOI is required field",
                }),
              })
          ),
      })
      .validate(body);
  },

  citationFormater: (body: Record<string, string>) => {
    return joi
      .object()
      .required()
      .keys({
        doi: joi.string().required().messages({
          "string.empty": "DOI cannot be an empty field",
          "any.required": "DOI is required field",
        }),
        formatType: joi.string().required().messages({
          "string.empty": "Format type cannot be an empty field",
          "any.required": "Format type is required field",
        }),
      })
      .validate(body);
  },

  advancedSearch: (body: Record<string, string>) => {
    return joi
      .object()
      .keys({
        searchDefault: joi.object().required().messages({
          "any.required": "Search is required field",
        }),
      })
      .validate(body);
  },
};
