{
    "name": "Integration Airtable",
    "flow": [
        {
            "id": 1,
            "module": "airtable:webhook",
            "version": 3,
            "parameters": {
                "__IMTHOOK__": 509694
            },
            "mapper": {},
            "metadata": {
                "designer": {
                    "x": 0,
                    "y": 0
                },
                "restore": {
                    "parameters": {
                        "__IMTHOOK__": {
                            "data": {
                                "editable": "false"
                            },
                            "label": "Airtable Webhook"
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "__IMTHOOK__",
                        "type": "hook:airtable",
                        "label": "Webhook",
                        "required": true
                    }
                ]
            }
        },
        {
            "id": 3,
            "module": "airtable:ActionGetRecord",
            "version": 3,
            "parameters": {
                "__IMTCONN__": 1505942
            },
            "filter": {
                "name": "record_id",
                "conditions": [
                    [
                        {
                            "a": "{{1.record_id}}",
                            "o": "exist"
                        }
                    ]
                ]
            },
            "mapper": {
                "id": "{{1.record_id}}",
                "base": "appMipeYj3rKOJv4z",
                "table": "tblIRQRiRRhh2LWgR",
                "useColumnId": false
            },
            "metadata": {
                "designer": {
                    "x": 300,
                    "y": 0
                },
                "restore": {
                    "expect": {
                        "base": {
                            "mode": "chose",
                            "label": "Spoke AI Meeting Bot"
                        },
                        "table": {
                            "mode": "chose",
                            "label": "Form Responses"
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
                        "name": "id",
                        "type": "text",
                        "label": "Record ID",
                        "required": true
                    }
                ],
                "interface": [
                    {
                        "name": "createdTime",
                        "type": "date",
                        "label": "Created Time"
                    },
                    {
                        "name": "id",
                        "type": "number",
                        "label": "id"
                    },
                    {
                        "name": "Meeting Bot Name",
                        "type": "text",
                        "label": "Meeting Bot Name"
                    },
                    {
                        "name": "Meeting URL",
                        "type": "text",
                        "label": "Meeting URL"
                    },
                    {
                        "name": "Meeting Bot Image",
                        "spec": [
                            {
                                "name": "id",
                                "type": "text",
                                "label": "ID"
                            },
                            {
                                "name": "url",
                                "type": "url",
                                "label": "URL"
                            },
                            {
                                "name": "filename",
                                "type": "filename",
                                "label": "File name"
                            },
                            {
                                "name": "size",
                                "type": "uinteger",
                                "label": "Size"
                            },
                            {
                                "name": "type",
                                "type": "text",
                                "label": "MIME type"
                            },
                            {
                                "name": "thumbnails",
                                "spec": [
                                    {
                                        "name": "small",
                                        "spec": [
                                            {
                                                "name": "url",
                                                "type": "url",
                                                "label": "URL"
                                            },
                                            {
                                                "name": "width",
                                                "type": "uinteger",
                                                "label": "Width"
                                            },
                                            {
                                                "name": "height",
                                                "type": "uinteger",
                                                "label": "Height"
                                            }
                                        ],
                                        "type": "collection",
                                        "label": "Small"
                                    },
                                    {
                                        "name": "large",
                                        "spec": [
                                            {
                                                "name": "url",
                                                "type": "url",
                                                "label": "URL"
                                            },
                                            {
                                                "name": "width",
                                                "type": "uinteger",
                                                "label": "Width"
                                            },
                                            {
                                                "name": "height",
                                                "type": "uinteger",
                                                "label": "Height"
                                            }
                                        ],
                                        "type": "collection",
                                        "label": "Large"
                                    },
                                    {
                                        "name": "full",
                                        "spec": [
                                            {
                                                "name": "url",
                                                "type": "url",
                                                "label": "URL"
                                            },
                                            {
                                                "name": "width",
                                                "type": "uinteger",
                                                "label": "Width"
                                            },
                                            {
                                                "name": "height",
                                                "type": "uinteger",
                                                "label": "Height"
                                            }
                                        ],
                                        "type": "collection",
                                        "label": "Full"
                                    }
                                ],
                                "type": "collection",
                                "label": "Thumbnails"
                            }
                        ],
                        "type": "array",
                        "label": "Meeting Bot Image"
                    },
                    {
                        "name": "Meeting Bot Entry Message",
                        "type": "text",
                        "label": "Meeting Bot Entry Message"
                    },
                    {
                        "name": "Created Time",
                        "type": "date",
                        "label": "Created Time"
                    },
                    {
                        "name": "API Key",
                        "type": "text",
                        "label": "API Key"
                    },
                    {
                        "name": "Created By",
                        "type": "text",
                        "label": "Created By"
                    }
                ]
            }
        },
        {
            "id": 2,
            "module": "http:ActionSendData",
            "version": 3,
            "parameters": {
                "handleErrors": false,
                "useNewZLibDeCompress": true
            },
            "mapper": {
                "ca": "",
                "qs": [],
                "url": "https://api.meetingbaas.com/bots",
                "data": "{\n           \"meeting_url\": \"{{3.`Meeting URL`}}\",\n           \"bot_name\": \"{{ifempty(3.`Meeting Bot Name`; \"Make Meeting Bot\")}}\",\n           \"bot_image\": \"{{3.`Meeting Bot Image`[].url}}https://www.make.com/assets/hq/img/make_logo_white.svg\",\n           \"entry_message\": \"{{ifempty(3.`Meeting Bot Entry Message`; \"Hello - recording this meeting\")}}\",\n           \"reserved\": false,\n           \"speech_to_text\": \"Gladia\"\n}",
                "gzip": true,
                "method": "post",
                "headers": [
                    {
                        "name": "x-spoke-api-key",
                        "value": "{{3.`API Key`}}"
                    }
                ],
                "timeout": "",
                "useMtls": false,
                "authPass": "",
                "authUser": "",
                "bodyType": "raw",
                "contentType": "application/json",
                "serializeUrl": false,
                "shareCookies": false,
                "parseResponse": false,
                "followRedirect": true,
                "useQuerystring": false,
                "followAllRedirects": false,
                "rejectUnauthorized": true
            },
            "metadata": {
                "designer": {
                    "x": 600,
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
                            "mode": "chose",
                            "items": [
                                null
                            ]
                        },
                        "bodyType": {
                            "label": "Raw"
                        },
                        "contentType": {
                            "label": "JSON (application/json)"
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "handleErrors",
                        "type": "boolean",
                        "label": "Evaluate all states as errors (except for 2xx and 3xx )",
                        "required": true
                    },
                    {
                        "name": "useNewZLibDeCompress",
                        "type": "hidden"
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
                        "name": "serializeUrl",
                        "type": "boolean",
                        "label": "Serialize URL",
                        "required": true
                    },
                    {
                        "name": "method",
                        "type": "select",
                        "label": "Method",
                        "required": true,
                        "validate": {
                            "enum": [
                                "get",
                                "head",
                                "post",
                                "put",
                                "patch",
                                "delete",
                                "options"
                            ]
                        }
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
                        "label": "Headers"
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
                        "label": "Query String"
                    },
                    {
                        "name": "bodyType",
                        "type": "select",
                        "label": "Body type",
                        "validate": {
                            "enum": [
                                "raw",
                                "x_www_form_urlencoded",
                                "multipart_form_data"
                            ]
                        }
                    },
                    {
                        "name": "parseResponse",
                        "type": "boolean",
                        "label": "Parse response",
                        "required": true
                    },
                    {
                        "name": "authUser",
                        "type": "text",
                        "label": "User name"
                    },
                    {
                        "name": "authPass",
                        "type": "password",
                        "label": "Password"
                    },
                    {
                        "name": "timeout",
                        "type": "uinteger",
                        "label": "Timeout",
                        "validate": {
                            "max": 300,
                            "min": 1
                        }
                    },
                    {
                        "name": "shareCookies",
                        "type": "boolean",
                        "label": "Share cookies with other HTTP modules",
                        "required": true
                    },
                    {
                        "name": "ca",
                        "type": "cert",
                        "label": "Self-signed certificate"
                    },
                    {
                        "name": "rejectUnauthorized",
                        "type": "boolean",
                        "label": "Reject connections that are using unverified (self-signed) certificates",
                        "required": true
                    },
                    {
                        "name": "followRedirect",
                        "type": "boolean",
                        "label": "Follow redirect",
                        "required": true
                    },
                    {
                        "name": "useQuerystring",
                        "type": "boolean",
                        "label": "Disable serialization of multiple same query string keys as arrays",
                        "required": true
                    },
                    {
                        "name": "gzip",
                        "type": "boolean",
                        "label": "Request compressed content",
                        "required": true
                    },
                    {
                        "name": "useMtls",
                        "type": "boolean",
                        "label": "Use Mutual TLS",
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