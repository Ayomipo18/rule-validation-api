const helper = {
    isValidJson: function(jsonString) {
        try {
            if (this.isObject(jsonString))
                return true;
            JSON.parse(jsonString);
            return true;
        } catch (err) {
            return false;
        }
    },
    isString: function(obj) {
        return Object.prototype.toString.call(obj) === "[object String]"
    },
    isObject: function(obj) {
        return typeof obj === 'object' && obj !== null
    },
    empty: function(str) {
        if (typeof str == 'undefined')
            return true;
        str = "" + str;
        if (!str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "")
            return true;
        else
            return false;
    }
}

module.exports = { helper }