import { Resources, Types } from 'fhir-proof';

const { Observation } = Resources,
      { CodeableConcept, Quantity, Coding } = Types;

module.exports = {

  label: 'Height',

  identifier: 'height',

  unit: 'meter',

  normalize: val => val.toFixed(2).toString() + ' m',

  getFhirObject(obj) {

    const coding = Coding({
      system: 'http://loinc.org',
      code: '8302-2',
      display: 'Body Height'
    });

    const code = CodeableConcept({
      text: this.label,
      coding: [ coding ],
    });

    const quantity = Quantity({
      value: obj.value,
      unit: this.unit,
    });

    return Observation({
      status: 'final',
      code: code,
      valueQuantity: quantity,
      effectiveDateTime: new Date(obj.startDate).toISOString() 
    });
  },

  getFhirDoc(obj) {
    return JSON.stringify(this.getFhirObject(obj));
  }

};
