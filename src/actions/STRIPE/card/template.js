const baseTemplate = {
  id: "String",
  address_city: "String",
  address_country: "String",
  address_line1: "String",
  address_line1_check: "String",
  address_line2: "String",
  address_state: "String",
  address_zip: "String",
  address_zip_check: "String",
  brand: "String",
  country: "String",
  customer: "String",
  cvc_check: "String",
  dynamic_last4: "String",
  exp_month: "Integer",
  exp_year: "Integer",
  fingerprint: "String",
  funding: "String",
  last4: "String",
  metadata: "Object",
  name: "String",
  tokenization_method: "String"
}

export default {
  withSource: {
    source: 'String',
  },
  withoutSource: baseTemplate,
}
