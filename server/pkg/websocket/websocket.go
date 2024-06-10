package websocket

import(
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// определить Upgrader
// для этого потребуется размер буфера чтения и записи
var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,

// проверить источник нашего соединения
// это позволит нам делать запросы из нашего React
	CheckOrigin: func(r *http.Request) bool { return true },
}

func Upgrade(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	conn, err := upgrader.Upgrade(w, r, nil) 
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return conn, nil
}

