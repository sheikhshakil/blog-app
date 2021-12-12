class Flash {
    constructor(req) {
        this.req  = req
        this.success = this.extractFlashMessage('success')
        this.error = this.extractFlashMessage('error')
    }

    extractFlashMessage(name) {
        let message = this.req.flash(name)
        if(message.length > 0) {
            return message[0]
        }
        else {
            return false
        }
    }

    hasMessage() {
        if(this.success || this.error){
            return true
        }
        else {
            return false
        }
    }

    static getMessage(req) {
        let flash = new Flash(req)
        return {
            success: flash.success,
            error: flash.error,
            hasMessage: flash.hasMessage()
        }
    }
}

module.exports = Flash