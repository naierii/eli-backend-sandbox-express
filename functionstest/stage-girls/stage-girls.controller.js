"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getStageGirls;
function getStageGirls(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('ddd getStageGirls executed');
            const { db } = req.app;
            const { firstName } = req.params;
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            let response;
            if (firstName) {
                response = yield db.collection('stage-girls').findOne({ firstName: capitalizeFirstLetter(firstName) });
            }
            else {
                response = yield db.collection('stage-girls').find().toArray();
            }
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    });
}
