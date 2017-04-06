import Weight from '../../app/sampleData/weight';

describe('sampleData', () => {

  it('should validate WeightSample', () => {

    // when
    var Observation = Weight.getFhirObject(100);

    // then
    expect(Observation).toMatchObject({
      resourceType: 'Observation',
      status: 'final',
      code: expect.objectContaining({
        text: 'Weight'
      }),
      valueQuantity: expect.objectContaining({
        value: 100,
        unit: 'gram'
      })
    });

  });

});
