package test

import (
	"fmt"
	"github.com/shoma-mano/go-sqlc/src/httputil"
	"testing"
)

type Body struct {
	Email             string `json:"email"`
	Password          string `json:"password"`
	ReturnSecureToken string `json:"returnSecureToken"`
}

type ResponseBody struct {
	IdToken      string
	LocalId      string
	Kind         string
	Email        string
	Registered   bool
	RefreshToken string
	ExpiresIn    string
}

func GetToken() ResponseBody {
	body := Body{Email: "gyusufo495@ichigo.me", Password: "password", ReturnSecureToken: "true"}
	var respJson = ResponseBody{}
	err := httputil.PostJson("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsoj-tIb-o58p4XrTuT26BoNoSsT_G2Nc", body, &respJson)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", respJson.LocalId)
	return respJson
}

func TestGetToken(t *testing.T) {
	token := GetToken()
	if token.IdToken == "" {
		t.Errorf("Result is %s,Couldn't get token", token.IdToken)
	}
}
