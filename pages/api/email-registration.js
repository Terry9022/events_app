import path from "path";
import fs from "fs";

function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;
  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);
  if (!allEvents) {
    return res.status(404).json({ message: "No events found" });
  }
  if (method === "POST") {
    const { email, eventId } = req.body;
    if (!email | !email.includes("@")) {
      res.status(422).json({ message: "Please provide a valid email address" });
      return;
    }
    const newAllEvents = allEvents.map((ev) => {
      if (ev.id === eventId) {
        if (ev.emails_registered.includes(email)) {
          res
            .status(201)
            .json({ message: "Email already registered for this event" });
        } else {
          return {
            ...ev,
            emails_registered: [...ev.emails_registered, email],
          };
        }
      }
      return ev;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );
    res.status(200).json({
      message: `You have been registered for ${eventId} with the email ${email}`,
    });
  }
}
