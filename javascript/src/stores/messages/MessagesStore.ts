/// <reference path="../../../declarations/jquery/jquery.d.ts" />

'use strict';

declare var $: any;
declare var jsRoutes: any;

import UserNotification = require("../../util/UserNotification");
import URLUtils = require("../../util/URLUtils");

interface Field {
    name: string;
    value: string;
}

interface Message {
    id: string;
    index: number;
    fields: Array<Field>;
}

var MessagesStore = {
    loadMessage(index: string, messageId: string): JQueryPromise<Message> {
        var url = jsRoutes.controllers.MessagesController.single(index.trim(), messageId.trim()).url;
        var promise = $.getJSON(url);
        promise.fail((jqXHR, textStatus, errorThrown) => {
            UserNotification.error("Loading message information failed with status: " + errorThrown,
                "Could not load message information");
        });
        return promise;
    },

    fieldTerms(index: string, messageId: string, field: string): JQueryPromise<Array<string>> {
        var url = jsRoutes.controllers.MessagesController.analyze(index, messageId, field).url;
        var promise = $.getJSON(url);
        promise.fail((jqXHR, textStatus, errorThrown) => {
            UserNotification.error("Loading field terms failed with status: " + errorThrown,
                "Could not load field terms.");
        });
        return promise;
    }
};

export = MessagesStore;
