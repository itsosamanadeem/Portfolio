
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage({handleLogin,error,setEmail,setPassword,email,password}) {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" required className="mt-1 w-full" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" required className="mt-1 w-full" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full mt-4">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
