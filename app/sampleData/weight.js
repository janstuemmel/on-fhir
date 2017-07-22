import { Resources, Types } from 'fhir-proof';
import moment from 'moment';

const { Observation } = Resources,
      { CodeableConcept, Quantity, Coding } = Types;

module.exports = {

  label: 'Weight',

  identifier: 'weight',

  unit: 'gram',

  normalize: val => (val/1000).toFixed(2).toString() + ' kg',

  getFhirObject(obj) {

    const coding = Coding({
      system: 'http://loinc.org',
      code: '29463-7',
      display: 'Body Weight'
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
      effectiveDateTime: moment(obj.startDate).toISOString()
    });
  },

  getFhirDoc(obj) {
    return JSON.stringify(this.getFhirObject(obj));
  }

};
