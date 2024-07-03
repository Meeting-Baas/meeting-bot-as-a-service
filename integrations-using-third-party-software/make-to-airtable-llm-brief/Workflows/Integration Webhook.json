{
    "name": "Integration Webhooks",
    "flow": [
        {
            "id": 1,
            "module": "gateway:CustomWebHook",
            "version": 1,
            "parameters": {
                "hook": 508182,
                "maxResults": 1
            },
            "mapper": {},
            "metadata": {
                "designer": {
                    "x": 0,
                    "y": 0
                },
                "restore": {
                    "parameters": {
                        "hook": {
                            "data": {
                                "editable": "true"
                            },
                            "label": "AI Meeting Bot Webhook"
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "hook",
                        "type": "hook:gateway-webhook",
                        "label": "Webhook",
                        "required": true
                    },
                    {
                        "name": "maxResults",
                        "type": "number",
                        "label": "Maximum number of results"
                    }
                ],
                "interface": [
                    {
                        "name": "event",
                        "type": "text"
                    },
                    {
                        "name": "data",
                        "spec": [
                            {
                                "name": "bot_id",
                                "type": "number"
                            },
                            {
                                "name": "transcript",
                                "spec": {
                                    "spec": [
                                        {
                                            "name": "speaker",
                                            "type": "text"
                                        },
                                        {
                                            "name": "words",
                                            "spec": {
                                                "spec": [
                                                    {
                                                        "name": "start",
                                                        "type": "number"
                                                    },
                                                    {
                                                        "name": "end",
                                                        "type": "number"
                                                    },
                                                    {
                                                        "name": "word",
                                                        "type": "text"
                                                    }
                                                ],
                                                "type": "collection"
                                            },
                                            "type": "array"
                                        }
                                    ],
                                    "type": "collection"
                                },
                                "type": "array"
                            },
                            {
                                "name": "speakers",
                                "spec": {
                                    "type": "text"
                                },
                                "type": "array"
                            },
                            {
                                "name": "mp4",
                                "type": "text"
                            }
                        ],
                        "type": "collection"
                    }
                ]
            }
        },
        {
            "id": 52,
            "module": "util:Switcher",
            "version": 1,
            "parameters": {},
            "filter": {
                "name": "event",
                "conditions": [
                    [
                        {
                            "a": "{{1.event}}",
                            "b": "complete",
                            "o": "text:equal"
                        }
                    ]
                ]
            },
            "mapper": {
                "input": "{{1.event}}",
                "useRegExpMatch": false,
                "casesTable": [
                    {
                        "pattern": "complete",
                        "output": "continue"
                    }
                ],
                "elseOutput": "stop"
            },
            "metadata": {
                "designer": {
                    "x": 300,
                    "y": 0
                },
                "restore": {
                    "expect": {
                        "casesTable": {
                            "mode": "chose",
                            "items": [
                                null
                            ]
                        }
                    }
                },
                "expect": [
                    {
                        "name": "input",
                        "type": "text",
                        "label": "Input"
                    },
                    {
                        "name": "useRegExpMatch",
                        "type": "boolean",
                        "label": "Use regular expressions to match",
                        "required": true
                    },
                    {
                        "name": "casesTable",
                        "type": "array",
                        "label": "Cases",
                        "required": true,
                        "spec": [
                            {
                                "name": "pattern",
                                "label": "Pattern",
                                "type": "text"
                            },
                            {
                                "name": "output",
                                "label": "Output",
                                "type": "any"
                            }
                        ]
                    },
                    {
                        "name": "elseOutput",
                        "type": "any",
                        "label": "Else"
                    }
                ]
            }
        },
        {
            "id": 44,
            "module": "util:SetVariable2",
            "version": 1,
            "parameters": {},
            "mapper": {
                "name": "speakers",
                "scope": "execution",
                "value": "{{1.data.speakers}}"
            },
            "metadata": {
                "designer": {
                    "x": 600,
                    "y": 0
                },
                "restore": {
                    "expect": {
                        "scope": {
                            "label": "One execution"
                        }
                    }
                },
                "expect": [
                    {
                        "name": "name",
                        "type": "text",
                        "label": "Variable name",
                        "required": true
                    },
                    {
                        "name": "scope",
                        "type": "select",
                        "label": "Variable lifetime",
                        "required": true,
                        "validate": {
                            "enum": [
                                "roundtrip",
                                "execution"
                            ]
                        }
                    },
                    {
                        "name": "value",
                        "type": "any",
                        "label": "Variable value"
                    }
                ],
                "interface": [
                    {
                        "name": "speakers",
                        "type": "any",
                        "label": "speakers"
                    }
                ]
            }
        },
        {
            "id": 14,
            "module": "builtin:BasicFeeder",
            "version": 1,
            "parameters": {},
            "mapper": {
                "array": "{{1.data.transcript}}"
            },
            "metadata": {
                "designer": {
                    "x": 900,
                    "y": 0
                },
                "restore": {
                    "expect": {
                        "array": {
                            "mode": "edit"
                        }
                    }
                },
                "expect": [
                    {
                        "mode": "edit",
                        "name": "array",
                        "spec": [],
                        "type": "array",
                        "label": "Array"
                    }
                ]
            }
        },
        {
            "id": 23,
            "module": "builtin:BasicFeeder",
            "version": 1,
            "parameters": {},
            "mapper": {
                "array": "{{14.words}}"
            },
            "metadata": {
                "designer": {
                    "x": 1200,
                    "y": 0
                },
                "restore": {
                    "expect": {
                        "array": {
                            "mode": "edit"
                        }
                    }
                },
                "expect": [
                    {
                        "mode": "edit",
                        "name": "array",
                        "spec": [],
                        "type": "array",
                        "label": "Array"
                    }
                ]
            }
        },
        {
            "id": 22,
            "module": "util:TextAggregator",
            "version": 1,
            "parameters": {
                "feeder": 23,
                "rowSeparator": "other",
                "otherRowSeparator": " "
            },
            "mapper": {
                "value": "{{23.word}}"
            },
            "metadata": {
                "designer": {
                    "x": 1500,
                    "y": 0
                },
                "restore": {
                    "extra": {
                        "feeder": {
                            "label": "Iterator [23]"
                        }
                    },
                    "parameters": {
                        "rowSeparator": {
                            "label": "Other"
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "rowSeparator",
                        "type": "select",
                        "label": "Row separator",
                        "validate": {
                            "enum": [
                                "\n",
                                "\t",
                                "other"
                            ]
                        }
                    },
                    {
                        "name": "otherRowSeparator",
                        "type": "text",
                        "label": "Separator"
                    }
                ],
                "expect": [
                    {
                        "name": "value",
                        "type": "text",
                        "label": "Text"
                    }
                ]
            }
        },
        {
            "id": 32,
            "module": "util:TextAggregator",
            "version": 1,
            "parameters": {
                "feeder": 22,
                "rowSeparator": ""
            },
            "mapper": {
                "value": "{{14.speaker}}:\\n{{22.text}}"
            },
            "metadata": {
                "designer": {
                    "x": 1800,
                    "y": 0
                },
                "restore": {
                    "extra": {
                        "feeder": {
                            "label": "Tools - Text aggregator [22]"
                        }
                    },
                    "parameters": {
                        "rowSeparator": {
                            "label": "Empty"
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "rowSeparator",
                        "type": "select",
                        "label": "Row separator",
                        "validate": {
                            "enum": [
                                "\n",
                                "\t",
                                "other"
                            ]
                        }
                    }
                ],
                "expect": [
                    {
                        "name": "value",
                        "type": "text",
                        "label": "Text"
                    }
                ]
            }
        },
        {
            "id": 26,
            "module": "builtin:BasicAggregator",
            "version": 1,
            "parameters": {
                "feeder": 52
            },
            "mapper": {
                "text": "{{32.text}}"
            },
            "metadata": {
                "designer": {
                    "x": 2100,
                    "y": 0
                },
                "restore": {
                    "extra": {
                        "feeder": {
                            "label": "Tools - Switch [52]"
                        },
                        "target": {
                            "label": "Custom"
                        }
                    }
                }
            }
        },
        {
            "id": 42,
            "module": "json:TransformToJSON",
            "version": 1,
            "parameters": {
                "space": ""
            },
            "mapper": {
                "object": "{{26.array}}"
            },
            "metadata": {
                "designer": {
                    "x": 2400,
                    "y": 0
                },
                "restore": {
                    "parameters": {
                        "space": {
                            "label": "Empty"
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "space",
                        "type": "select",
                        "label": "Indentation",
                        "validate": {
                            "enum": [
                                "tab",
                                "2",
                                "4"
                            ]
                        }
                    }
                ],
                "expect": [
                    {
                        "name": "object",
                        "type": "any",
                        "label": "Object"
                    }
                ]
            }
        },
        {
            "id": 2,
            "module": "http:ActionSendDataAPIKeyAuth",
            "version": 3,
            "parameters": {
                "auth": 14964,
                "handleErrors": false
            },
            "mapper": {
                "ca": "",
                "qs": [],
                "url": "https://openrouter.ai/api/v1/chat/completions",
                "data": "{\n  \"model\": \"openrouter/cinematika-7b:free\",  \n  \"messages\": [\n    {\"role\": \"user\", \"content\": \"Given a detailed transcript of a meeting, generate a concise summary that captures the key points, decisions made, and action items, formatted in Markdown for better readability and organization. Do NOT include any other information other than the summary in markdown.\"},\n    {\"role\": \"user\", \"content\": \"{{replace(42.json; \"\"\"\"; \"'\")}}\"}  \n  ]\n}",
                "gzip": true,
                "method": "post",
                "headers": [],
                "timeout": "",
                "useMtls": false,
                "bodyType": "raw",
                "contentType": "application/json",
                "serializeUrl": false,
                "shareCookies": false,
                "parseResponse": true,
                "followRedirect": true,
                "useQuerystring": false,
                "followAllRedirects": false,
                "rejectUnauthorized": true
            },
            "metadata": {
                "designer": {
                    "x": 2700,
                    "y": 0
                },
                "restore": {
                    "expect": {
                        "qs": {
                            "mode": "chose"
                        },
                        "method": {
                            "mode": "chose",
                            "label": "POST"
                        },
                        "headers": {
                            "mode": "chose"
                        },
                        "bodyType": {
                            "label": "Raw"
                        },
                        "contentType": {
                            "label": "JSON (application/json)"
                        }
                    },
                    "parameters": {
                        "auth": {
                            "label": "OpenRouter API Key"
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "auth",
                        "type": "keychain:apikeyauth",
                        "label": "Credentials",
                        "required": true
                    },
                    {
                        "name": "handleErrors",
                        "type": "boolean",
                        "label": "Evaluate all states as errors (except for 2xx and 3xx )",
                        "required": true
                    }
                ],
                "expect": [
                    {
                        "name": "url",
                        "type": "url",
                        "label": "URL",
                        "required": true
                    },
                    {
                        "help": "Serializes URL and escapes special characters.",
                        "name": "serializeUrl",
                        "type": "boolean",
                        "label": "Serialize URL",
                        "default": false,
                        "advanced": true,
                        "required": true
                    },
                    {
                        "name": "method",
                        "type": "select",
                        "label": "Method",
                        "default": "get",
                        "options": [
                            {
                                "label": "GET",
                                "value": "get"
                            },
                            {
                                "label": "HEAD",
                                "value": "head"
                            },
                            {
                                "label": "POST",
                                "value": "post"
                            },
                            {
                                "label": "PUT",
                                "value": "put"
                            },
                            {
                                "label": "PATCH",
                                "value": "patch"
                            },
                            {
                                "label": "DELETE",
                                "value": "delete"
                            },
                            {
                                "label": "OPTIONS",
                                "value": "options"
                            }
                        ],
                        "editable": true,
                        "required": true
                    },
                    {
                        "name": "headers",
                        "spec": [
                            {
                                "name": "name",
                                "type": "text",
                                "label": "Name",
                                "required": true
                            },
                            {
                                "name": "value",
                                "type": "text",
                                "label": "Value"
                            }
                        ],
                        "type": "array",
                        "label": "Headers",
                        "labels": {
                            "add": "Add a header",
                            "edit": "Edit a header"
                        },
                        "editable": true,
                        "required": false
                    },
                    {
                        "name": "qs",
                        "spec": [
                            {
                                "name": "name",
                                "type": "text",
                                "label": "Name",
                                "required": true
                            },
                            {
                                "name": "value",
                                "type": "text",
                                "label": "Value"
                            }
                        ],
                        "type": "array",
                        "label": "Query String",
                        "labels": {
                            "add": "Add parameter",
                            "edit": "Edit parameter"
                        },
                        "editable": true,
                        "required": false
                    },
                    {
                        "name": "bodyType",
                        "type": "select",
                        "label": "Body type",
                        "options": [
                            {
                                "label": "Raw",
                                "value": "raw",
                                "nested": [
                                    {
                                        "help": "Sets the `Content-Type` request header.",
                                        "name": "contentType",
                                        "type": "select",
                                        "label": "Content type",
                                        "options": [
                                            {
                                                "label": "Text (text/plain)",
                                                "value": "text/plain"
                                            },
                                            {
                                                "label": "JSON (application/json)",
                                                "value": "application/json"
                                            },
                                            {
                                                "label": "XML (application/xml)",
                                                "value": "application/xml"
                                            },
                                            {
                                                "label": "XML (text/xml)",
                                                "value": "text/xml"
                                            },
                                            {
                                                "label": "HTML (text/html)",
                                                "value": "text/html"
                                            },
                                            {
                                                "label": "Custom",
                                                "value": "custom",
                                                "nested": [
                                                    {
                                                        "name": "customContentType",
                                                        "type": "text",
                                                        "label": "Value",
                                                        "required": true
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "data",
                                        "type": "buffer",
                                        "label": "Request content"
                                    }
                                ]
                            },
                            {
                                "label": "Application/x-www-form-urlencoded",
                                "value": "x_www_form_urlencoded",
                                "nested": [
                                    {
                                        "name": "formFields",
                                        "spec": [
                                            {
                                                "name": "key",
                                                "type": "text",
                                                "label": "Key",
                                                "required": true
                                            },
                                            {
                                                "name": "value",
                                                "type": "text",
                                                "label": "Value"
                                            }
                                        ],
                                        "type": "array",
                                        "label": "Fields",
                                        "editable": true
                                    }
                                ]
                            },
                            {
                                "label": "Multipart/form-data",
                                "value": "multipart_form_data",
                                "nested": [
                                    {
                                        "name": "formDataFields",
                                        "spec": [
                                            {
                                                "name": "fieldType",
                                                "type": "select",
                                                "label": "Field type",
                                                "options": [
                                                    {
                                                        "label": "Text",
                                                        "value": "text",
                                                        "nested": [
                                                            {
                                                                "name": "key",
                                                                "type": "text",
                                                                "label": "Key",
                                                                "required": true
                                                            },
                                                            {
                                                                "name": "value",
                                                                "type": "text",
                                                                "label": "Value"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "label": "File",
                                                        "value": "file",
                                                        "nested": [
                                                            {
                                                                "name": "key",
                                                                "type": "text",
                                                                "label": "Key",
                                                                "required": true
                                                            },
                                                            {
                                                                "name": "data",
                                                                "type": "buffer",
                                                                "label": "Data",
                                                                "semantic": "file:data"
                                                            },
                                                            {
                                                                "help": "File name, including the suffix, e.g. invoice, xml",
                                                                "name": "fileName",
                                                                "type": "filename",
                                                                "label": "File name",
                                                                "semantic": "file:name"
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "required": true
                                            }
                                        ],
                                        "type": "array",
                                        "label": "Fields",
                                        "editable": true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "help": "Automatically parses responses and converts JSON and XML responses so you don't need to use JSON or XML parser. Before you can use parsed JSON or XML content, run the module once manually so that the module can recognize the response content and allows you to map it in subsequent modules.",
                        "name": "parseResponse",
                        "type": "boolean",
                        "label": "Parse response",
                        "required": true
                    },
                    {
                        "help": "In seconds. Default: 300 seconds. This value controls two timeouts: Read timeout and Connection timeout. Read timeout is a time to wait for a server to send response headers (and start the response body) before aborting the request. Connection timeout sets the socket to timeout after timeout milliseconds of inactivity.",
                        "name": "timeout",
                        "type": "uinteger",
                        "label": "Timeout",
                        "advanced": true,
                        "validate": {
                            "max": 300,
                            "min": 1
                        }
                    },
                    {
                        "name": "shareCookies",
                        "type": "boolean",
                        "label": "Share cookies with other HTTP modules",
                        "default": false,
                        "advanced": true,
                        "required": true
                    },
                    {
                        "help": "Upload your certificate if you want to use TLS using your self-signed certificate.",
                        "name": "ca",
                        "type": "cert",
                        "label": "Self-signed certificate",
                        "advanced": true
                    },
                    {
                        "name": "rejectUnauthorized",
                        "type": "boolean",
                        "label": "Reject connections that are using unverified (self-signed) certificates",
                        "default": true,
                        "advanced": true,
                        "required": true
                    },
                    {
                        "name": "followRedirect",
                        "type": "boolean",
                        "label": "Follow redirect",
                        "nested": [
                            {
                                "help": "Follows also non-GET HTTP 3xx responses as redirects.",
                                "name": "followAllRedirects",
                                "type": "boolean",
                                "label": "Follow all redirect",
                                "advanced": true,
                                "required": true
                            }
                        ],
                        "default": true,
                        "advanced": true,
                        "required": true
                    },
                    {
                        "help": "By default, Make handles multiple values for the same url query string parameter key as arrays (e.g. `www.test.com?foo=bar&foo=baz`will be converted to `www.test.com?foo[0]=bar&foo[1]=baz`). To disable this feature, activate this option.",
                        "name": "useQuerystring",
                        "type": "boolean",
                        "label": "Disable serialization of multiple same query string keys as arrays",
                        "default": false,
                        "advanced": true,
                        "required": true
                    },
                    {
                        "help": "Adds an `Accept-Encoding` header to request compressed content.",
                        "name": "gzip",
                        "type": "boolean",
                        "label": "Request compressed content",
                        "default": true,
                        "advanced": true,
                        "required": true
                    },
                    {
                        "name": "useMtls",
                        "type": "boolean",
                        "label": "Use Mutual TLS",
                        "default": false,
                        "advanced": true,
                        "required": true
                    },
                    {
                        "name": "contentType",
                        "type": "select",
                        "label": "Content type",
                        "validate": {
                            "enum": [
                                "text/plain",
                                "application/json",
                                "application/xml",
                                "text/xml",
                                "text/html",
                                "custom"
                            ]
                        }
                    },
                    {
                        "name": "data",
                        "type": "buffer",
                        "label": "Request content"
                    },
                    {
                        "name": "followAllRedirects",
                        "type": "boolean",
                        "label": "Follow all redirect",
                        "required": true
                    }
                ]
            }
        },
        {
            "id": 45,
            "module": "util:GetVariable2",
            "version": 1,
            "parameters": {},
            "mapper": {
                "name": "speakers"
            },
            "metadata": {
                "designer": {
                    "x": 3000,
                    "y": 0
                },
                "restore": {},
                "expect": [
                    {
                        "name": "name",
                        "type": "text",
                        "label": "Variable name",
                        "required": true
                    }
                ],
                "interface": [
                    {
                        "name": "speakers",
                        "type": "any",
                        "label": "speakers"
                    }
                ]
            }
        },
        {
            "id": 3,
            "module": "airtable:ActionCreateRecord",
            "version": 3,
            "parameters": {
                "__IMTCONN__": 1505942
            },
            "mapper": {
                "base": "appMipeYj3rKOJv4z",
                "table": "tblEq5gEDiiCmbZgp",
                "record": {
                    "fld6rWq5V5kSfBiPY": "Meeting Summary - {{2.data.id}}",
                    "fldHABoZOee5ZUUTr": "{{2.data.choices[].message.content}}",
                    "fldQwXy2VOsJMSvd8": "A description of a meeting",
                    "fldVjJGWNrl52pVbH": "{{join(45.speakers; \", \")}}",
                    "fldl0qW8PLVkJSArn": "{{now}}"
                },
                "typecast": false,
                "useColumnId": false
            },
            "metadata": {
                "designer": {
                    "x": 3300,
                    "y": 0
                },
                "restore": {
                    "expect": {
                        "base": {
                            "label": "Spoke AI Meeting Bot"
                        },
                        "table": {
                            "label": "Data",
                            "nested": [
                                {
                                    "name": "record",
                                    "spec": [
                                        {
                                            "name": "fld6rWq5V5kSfBiPY",
                                            "type": "text",
                                            "label": "Name"
                                        },
                                        {
                                            "name": "fldQwXy2VOsJMSvd8",
                                            "type": "text",
                                            "label": "Description"
                                        },
                                        {
                                            "name": "fldHABoZOee5ZUUTr",
                                            "type": "text",
                                            "label": "Summary"
                                        },
                                        {
                                            "name": "fldl0qW8PLVkJSArn",
                                            "time": false,
                                            "type": "date",
                                            "label": "MeetingDate"
                                        },
                                        {
                                            "name": "fldVjJGWNrl52pVbH",
                                            "type": "text",
                                            "label": "Attendees"
                                        }
                                    ],
                                    "type": "collection",
                                    "label": "Record"
                                }
                            ]
                        },
                        "typecast": {
                            "mode": "chose"
                        },
                        "useColumnId": {
                            "mode": "chose"
                        }
                    },
                    "parameters": {
                        "__IMTCONN__": {
                            "data": {
                                "scoped": "true",
                                "connection": "airtable3"
                            },
                            "label": "Airtable OAuth connection (User ID: usrCQEOCGSxy9AxCW)"
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "__IMTCONN__",
                        "type": "account:airtable3,airtable2",
                        "label": "Connection",
                        "required": true
                    }
                ],
                "expect": [
                    {
                        "name": "base",
                        "type": "select",
                        "label": "Base",
                        "required": true
                    },
                    {
                        "name": "typecast",
                        "type": "boolean",
                        "label": "Smart links",
                        "required": true
                    },
                    {
                        "name": "useColumnId",
                        "type": "boolean",
                        "label": "Use Column ID",
                        "required": true
                    },
                    {
                        "name": "table",
                        "type": "select",
                        "label": "Table",
                        "required": true
                    },
                    {
                        "name": "record",
                        "spec": [
                            {
                                "name": "fld6rWq5V5kSfBiPY",
                                "type": "text",
                                "label": "Name"
                            },
                            {
                                "name": "fldQwXy2VOsJMSvd8",
                                "type": "text",
                                "label": "Description"
                            },
                            {
                                "name": "fldHABoZOee5ZUUTr",
                                "type": "text",
                                "label": "Summary"
                            },
                            {
                                "name": "fldl0qW8PLVkJSArn",
                                "time": false,
                                "type": "date",
                                "label": "MeetingDate"
                            },
                            {
                                "name": "fldVjJGWNrl52pVbH",
                                "type": "text",
                                "label": "Attendees"
                            }
                        ],
                        "type": "collection",
                        "label": "Record"
                    }
                ],
                "interface": [
                    {
                        "name": "id",
                        "type": "text",
                        "label": "ID"
                    },
                    {
                        "name": "createdTime",
                        "type": "date",
                        "label": "Created Time"
                    },
                    {
                        "name": "Name",
                        "type": "text",
                        "label": "Name"
                    },
                    {
                        "name": "Description",
                        "type": "text",
                        "label": "Description"
                    },
                    {
                        "name": "Summary",
                        "type": "text",
                        "label": "Summary"
                    },
                    {
                        "name": "MeetingDate",
                        "time": false,
                        "type": "date",
                        "label": "MeetingDate"
                    },
                    {
                        "name": "Attendees",
                        "type": "text",
                        "label": "Attendees"
                    }
                ]
            }
        }
    ],
    "metadata": {
        "instant": true,
        "version": 1,
        "scenario": {
            "roundtrips": 1,
            "maxErrors": 3,
            "autoCommit": true,
            "autoCommitTriggerLast": true,
            "sequential": false,
            "slots": null,
            "confidential": false,
            "dataloss": false,
            "dlq": false,
            "freshVariables": false
        },
        "designer": {
            "orphans": []
        },
        "zone": "eu2.make.com"
    }
}