export interface Institution {
    id: number;
    name: string;
    type: string;
    website: string;
    display_name: string;
    country_codes: string[]; // Array de códigos de país
    primary_color: string;
    logo: string;
    icon_logo: string;
    text_logo: string;
    form_fields: FormField[]; // Array de campos de formulario
    features: Feature[]; // Array de características
    resources: string[]; // Lista de recursos disponibles
    integration_type: string;
    status: string;
  }
  
  export interface FormField {
    name: string;
    type: string;
    label: string;
    validation: string;
    placeholder: string;
    validation_message: string;
    values?: FormValue[]; // Este campo es opcional porque no siempre está presente
  }
  
  export interface FormValue {
    code: string;
    label: string;
    validation: string;
    validation_message: string;
    placeholder: string;
  }
  
  export interface Feature {
    name: string;
    description: string;
  }  