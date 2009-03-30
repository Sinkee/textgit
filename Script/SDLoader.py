import httplib
import urllib2
import sys
'''SDLoader use httplib or urllib2 to get a address and sav it to a path.'''
def download(SourceURL,Name):
    SourceFile=urllib2.urlopen(SourceURL)
    DestFile=open(Name,'w')
    FileStr=SourceFile.read(100)
    while FileStr:
        DestFile.write(FileStr)
        FileStr=SourceFile.read(100)

    SourceFile.close()
    DestFile.close()


if __name__=='__main__':
    SourceURL=sys.argv[1]
    Name=sys.argv[2]
    download(SourceURL,Name)
