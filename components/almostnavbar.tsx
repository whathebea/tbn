import { Skeleton } from "@components/ui/skeleton";
import 
const almostNavBar = ({ loading }) => {
  return (
    <div className="flex">
      {
        loading ?
          <Skeleton className="w-[80px] h-[40px] rounded-xl" />
          :
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
      }
      {
        loading ?
          <Skeleton className="w-[100px] h-[40px] rounded-xl mx-2" />
          :
          <Button className="mx-2" onClick={() => signOut()}>Logout</Button>
      }
    </div>
  );
};

export default YourComponent;