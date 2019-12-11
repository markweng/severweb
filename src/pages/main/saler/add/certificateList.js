export default [
  {
    title: "营业执照",
    isRequired: true,
    hasCompany: true,
    hasCertificates: true,
    hasDueTime: true,
    license: "business_license", //证书
    name: "business_license_name", //单位名称
    number: "business_license_number", //证件号
    expires: "business_license_expires" //有效期
  },
  {
    title: "GSP",
    isRequired: true,
    hasCertificates: true,
    hasDueTime: true,
    field: "",
    license: "drug_quality_qualification", //证书
    number: "drug_quality_qualification_number", //证件号
    expires: "drug_quality_qualification_expires" //有效期
  },
  {
    title: "开户许可证",
    isRequired: true,
    hasCertificates: true,
    hasDueTime: true,
    license: "open_account_licence", //证书
    number: "open_account_licence_number", //证件号
    expires: "open_account_licence_expires" //有效期
  },
  {
    title: "药品经营许可证",
    isRequired: true,
    hasCertificates: true,
    hasDueTime: true,
    license: "drug_licence", //证书
    number: "drug_licence_number", //证件号
    expires: "drug_licence_expires" //有效期
  },
  {
    title: "药品经营资质保证协议",
    isRequired: true,
    license: "drug_quality_agreement" //证书
  },
  {
    title: "合格供货方档案表",
    isRequired: true,
    license: "qualified_supplier_document" //证书
  },
  {
    title: "税票样本",
    isRequired: true,
    license: "tax_bill_sample" //证书
  },
  {
    title: "法人授权委托书",
    isRequired: true,
    hasDueTime: true,
    license: "legal_authorize", //证书
    expires: "legal_authorize_expires" //有效期
  },
  {
    title: "授权人身份证",
    isRequired: true,
    hasCertificates: true,
    hasDueTime: true,
    license: "authorizer_id_card", //证书
    number: "authorizer_id_card_number", //证件号
    expires: "authorizer_id_card_expires" //有效期
  },
  {
    title: "法人身份证",
    isRequired: true,
    hasCertificates: true,
    hasDueTime: true,
    license: "legal_person_id_card", //证书
    number: "legal_person_id_card_number", //证件号
    expires: "legal_person_id_card_expires" //有效期
  },
  {
    title: "质量保证体系评价表",
    isRequired: true,
    license: "quality_assurance_evaluation" //证书
  },
  {
    title: "随货同行单销售清单样式",
    isRequired: true,
    license: "account_sales_sample" //证书
  },
  {
    title: "增值税发票样式",
    license: "tax_invoice_sample" //证书
  },
  {
    title: "公章样式表",
    license: "official_seal_sample" //证书
  },

  {
    title: "医疗器械经营许可证",
    license: "drug_instruments_licence" //证书
  },
  {
    title: "变更记录",
    license: "qualification_change_record" //证书
  },
  {
    title: "组织机构代码",
    hasCertificates: true,
    hasDueTime: true,
    license: "institutional_framework", //证书
    number: "institutional_framework_number", //证件号
    expires: "institutional_framework_expires" //有效期
  },
  {
    title: "食品流通许可证",
    hasCertificates: true,
    hasDueTime: true,
    license: "food_circulation_licence", //证书
    number: "food_circulation_licence_number", //证件号
    expires: "food_circulation_licence_expires" //有效期
  },
  {
    title: "税务登记证",
    hasCertificates: true,
    hasDueTime: true,
    license: "tax_registration_qualification", //证书
    number: "tax_registration_qualification_number", //证件号
    expires: "tax_registration_qualification_expires" //有效期
  },
  {
    title: "第二类医疗器械经营备案凭证",
    hasCertificates: true,
    hasDueTime: true,
    license: "second_drug_instruments_certification", //证书
    number: "second_drug_instruments_certification_number", //证件号
    expires: "second_drug_instruments_certification_expires" //有效期
  }
];
