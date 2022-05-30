package httputil

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"
)

var myClient = &http.Client{Timeout: 10 * time.Second}

func GetJson(url string, target interface{}) error {
	r, err := myClient.Get(url)
	if err != nil {
		return err
	}
	defer r.Body.Close()

	return json.NewDecoder(r.Body).Decode(target)
}

func PostJson(url string, body interface{}, target interface{}) error {
	requestBody, _ := json.Marshal(body)
	r, err := myClient.Post(url, "application/json", bytes.NewBuffer(requestBody))
	if err != nil {
		return err
	}
	defer r.Body.Close()
	//by, err := ioutil.ReadAll(r.Body)
	//fmt.Println(string(by))
	return json.NewDecoder(r.Body).Decode(target)
}
