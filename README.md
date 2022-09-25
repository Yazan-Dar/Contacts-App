Hier sind die Features unserer Wep-Application (mit Node js und MongoDB):
- Anmeldungssystem: Registration, login (profile ändern), password zürucksetzen.
- Contacts: (Kontakte erstellen, anzeigen, bearbeiten, suchen und löshen).
Jede Kontakt hat Image, Vorname, Nachname, telefonnummer und email-Adresse. Wenn es mehr als 6 Kontakte sind, werden die restlichen Kontakte ausgeblendet und es erscheint ein Button "Load more", die 6 andere Kontakte gleichzeitig anzeigt.
- ToDo: (task erstellen, anzeigen, bearbeiten, status ändern, löschen).
Jede Aufgabe hat Title, Description, Assignee. Man kann eine Aufgabe für sich selbst oder für eines der registrierten Mitglieder erstellen, der sie in seinem eigenen Konto mit dem Namen des Erstellters und dem Erstellungsdatum findet.
- Appointments: (erstellen, anzeigen, bearbeiten und löshen).
Jeder Termin besteht aus einem Text, dem Namen der Person, an die der Termin gesendet wird, und einer E-Mail sowie Datum und Uhrzeit des Termins und kann über eine einfache und schnelle Benutzeroberfläche einfach ausgewählt werden. Dem Termin können auch Anhänge hinzugefügt werden. Am Ende wird der Termin an die angegebene Person gesendet und ihr werden die Termindetails per E-Mail mitgeteilt. Er wird auch über neue Details benachrichtigt, wenn der Termin geändert wird.

Security Features:
- Unautorisierte Benutzer können nicht auf die Daten anderer Benutzer zugreifen und diese ändern.
- Nicht authentifizierte Benutzer können nicht auf die Daten anderer Benutzer zugreifen und diese ändern.
- Für alle vorherigen Fälle erscheint immer eine Fehlermeldung.

Hinweis: Damit sowohl das Zurücksetzen des Passworts und die Änderungsbestätigung beim Anmeldungssystem, als auch beim Versenden eine Terminbenachrichtigung per E-Mail korrekt funktionieren, können Sie Ihre Daten hinzufügen (Smtp-E-Mail). Wir haben es mit einem E-Mail-Konto auf einem privaten Hosting versucht und es hat funktioniert.

Da der mit anderen Gruppen geteilte Server nicht erstellt wurde, haben wir alle Funktionen in unserer App lokal erstellt.

--------------------------------------------------------------------------------------------------

Damit das Projekt funktioniert, müssen folgende Befehle ausgeführt werden (Librarys herunterladen):

npm i 
or 
npm install

mongod 	  --> 	to start MongoDB Server
mongo       --> 	to go in Terminal of MongoDB


https://www.mongodb.com/developer/quickstart/cheat-sheet/

---------------------------------------------------------------------------------------------------

Referenzen:
Node js libraries https://www.npmjs.com/
https://jquery.com/
https://getbootstrap.com/
https://fontawesome.com/
cdn.jsdelivr.net/npm/datetimepicker@latest/dist/DateTimePicker.min.js
cdn.jsdelivr.net/npm/datetimepicker@latest/dist/DateTimePicker.min.css


