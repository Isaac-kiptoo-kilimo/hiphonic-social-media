import joi from 'joi'

export  const createEventAttendeeValidator=(eventAttendes)=>{
    const createAttendeesValidatorSchema=joi.object({
        EventID: joi.string().required(),
        AttendeeID : joi.string().required(),
    })

    return createAttendeesValidatorSchema.validate(eventAttendes);
}
