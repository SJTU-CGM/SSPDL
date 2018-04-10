type T_method = "GET" | "POST";
type T_resourceType = "bin" | "xml" | "html" | "json" | "text";

function translateResourceType(type : T_resourceType) : XMLHttpRequestResponseType {
    let mapping : { [prop: string] : XMLHttpRequestResponseType } = {
        "bin" : "arraybuffer",
        "xml" : "document",
        "html": "document",
        "json": "json",
        "text": "text"
    };
    return mapping[type];
}

export function requestResource(method : T_method, URL : string, resourceType: T_resourceType, handle : any) : any {
    let request = new XMLHttpRequest();
    request.open(method, URL);
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE)
        {
            if (request.status !== 200)
            {
                console.log(request);
                throw Error();
            }
            else
            {
                let response = (resourceType === "bin") ? new Uint8Array(request.response) : request.response;
                handle(response);
            }
        }
    }
    request.responseType = translateResourceType(resourceType);
    request.send();
}