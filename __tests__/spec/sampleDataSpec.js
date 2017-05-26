import Weight from '../../app/sampleData/weight';

describe('sampleData', () => {

  it('should validate WeightSample', () => {

    // when
    var Observation = Weight.getFhirObject({
      value: 100,
      unit: 'gram',
      startDate: new Date().toISOString()
    });

    // then
    expect(Observation).toMatchObject({
      resourceType: 'Observation',
      status: 'final',
      code: expect.objectContaining({
        text: 'Weight',
        coding: expect.arrayContaining([
          {
            system: 'http://loinc.org',
            code: '29463-7',
            display: 'Body Weight',
          }
        ])
      }),
      valueQuantity: expect.objectContaining({
        value: 100,
        unit: 'gram'
      })
    });

  });

});
