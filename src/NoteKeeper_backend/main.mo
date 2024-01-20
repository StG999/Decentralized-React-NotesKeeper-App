import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";

actor NoteKeeper {

  public type Note = {
    title : Text;
    content : Text;
  };

  stable var notes : List.List<Note> = List.nil<Note>();

  public func createNote(titleText : Text, contentText : Text) {
    let newNote : Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push<Note>(newNote, notes);

    Debug.print(debug_show (newNote));
  };

  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  public func removeNote(index : Nat) {
    let list1 = List.drop(notes, index +1);
    let list2 = List.take(notes, index);
    notes := List.append(list2, list1);
  };
};
