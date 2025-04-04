import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Tiptap from "@/components/tiptap_editor/tiptap";
export default function CurdBlog({post,title,onChange,handleCreate}) {
    return (
        <>
            <Card className="w-full min-h-fit my-20 mx-8">
                <CardHeader>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Name of your project"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-start gap-4">
                    <Button >Save</Button>
                    <Button >Delete</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </CardFooter>
                <div className="className='w-full h-full mb-20'">
                    <Tiptap content={post} onChange={onChange} />
                </div>
            </Card>
        </>
    );
}