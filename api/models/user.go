package models

// User represent the user model
type User struct {
	ID        string `json:"id"`
	Data      UserData
	RoleId    int `json:"role_id"`
	RowNumber int `json:"rowNumber,omitempty"`
	TotalRow  int `json:"totalRow,omitempty"`
}

type UserData struct {
	Email     string `json:"email,omitempty"`
	Phone     string `json:"phone,omitempty"`
	Password  string `json:"password,omitempty"`
	Username  string `json:"username,omitempty"`
	IsActive  string `json:"is_active,omitempty"`
	LastName  string `json:"last_name,omitempty"`
	UserCode  string `json:"user_code,omitempty"`
	FirstName string `json:"first_name,omitempty"`
	LastLogin string `json:"last_login,omitempty"`
}

type UserFetch struct {
	Username string `json:"username,omitempty"`
	Email    string `json:"email,omitempty"`
	Status   *bool `json:"status,omitempty"`
}

type UserFetchByID struct {
	UserID   string `json:"user_id"`
	Username string `json:"username,omitempty"`
	Email    string `json:"email,omitempty"`
	RoleName string `json:"role_name,omitempty"`
}

type UserLogin struct {
	UserID   string `json:"user_id"`
	RoleName string `json:"role_name,omitempty"`
}